import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { URLSearchParams } from "url";
import { string, z } from "zod";

export const config = {
  runtime: "edge",
};

const querySchema = z.object({
  thumbnail: z.string().url(),
  name: z.string(),
  id: z.string(),
});

const Handler = (req: NextRequest) => {
  const parse = parseSearchParams(req.nextUrl.searchParams);
  if (!parse.success) {
    return fallbackImg();
  }
  const dimensions = getDimensionsFromUrl(parse.data.thumbnail);
  if (!dimensions) {
    return fallbackImg();
  }

  const adjustedDimensions = adjustDimensions(dimensions, 1200);
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "rgb(20 30 40)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          color: "#fafafa",
        }}
      >
        <h1 tw="text-5xl">
          <span style={{ marginRight: "0.25em" }}>{parse.data.name}</span>{" "}
          heardle. Sorry this isnt pretty
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          tw=""
          width={adjustedDimensions.width}
          height={adjustedDimensions.height}
          src={parse.data.thumbnail}
          alt=""
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};

function parseSearchParams(params: URLSearchParams) {
  const rawThumbnail = params.get("thumbnail");
  const rawName = params.get("name");
  const rawId = params.get("id");
  return querySchema.safeParse({
    thumbnail: rawThumbnail,
    name: rawName,
    id: rawId,
  });
}

/**
 *
 * @returns null if a string with the shape w1200-h2300 is not found
 */
function getDimensionsFromUrl(thumbnailUrl: string) {
  const dimensionsRegex = /w(\d+)-h(\d+)/;
  const dimensionsMatch = thumbnailUrl.match(dimensionsRegex);
  if (!dimensionsMatch || !dimensionsMatch[2]) return null;

  // dimensionsMatch[0] matches both things so not useful
  const width = dimensionsMatch[1];
  const height = dimensionsMatch[2];

  return { width: parseInt(width), height: parseInt(height) };
}

function adjustDimensions(
  dimensions: {
    width: number;
    height: number;
  },
  MAX_WIDTH: number = 700
) {
  const { width, height } = dimensions;
  const multiplier = MAX_WIDTH / width;
  return { width: width * multiplier, height: height * multiplier };
}

const fallbackImg = () => {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Ummm trouble with this artist...no thumbnail for you
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};

export default Handler;
