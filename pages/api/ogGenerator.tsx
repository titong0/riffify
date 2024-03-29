import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { string, z } from "zod";
import { host } from "../../config";

export const config = {
  runtime: "edge",
};

const querySchema = z.object({
  thumbnail: z.string().url(),
  name: z.string(),
  id: z.string(),
});

const Handler = (req: NextRequest) => {
  const correctedQuery = correctQuery(req.nextUrl);
  const queryData = parseSearchParams(correctedQuery);

  if (!queryData.success) {
    console.log("req.nextUrl", JSON.stringify(req.nextUrl, null, 2));
    console.log(correctedQuery);
    console.log(queryData.error);
    return fallbackImg();
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          backgroundColor: "rgb(20 20 20)",
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundSize: "contain",
            zIndex: "-1",
          }}
          src={queryData.data.thumbnail}
          alt=""
        ></img>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "600px",
            width: "1200px",
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(4,13,15,1) 90%)`,
            zIndex: "-1",
          }}
        ></div>
        <div tw="flex flex-col justify-center items-center text-3xl w-[1200px] h-[600px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${host}/riffify.svg`}
            style={{
              position: "absolute",
              height: "600px",
              top: "-5rem",
            }}
            alt=""
          />
          <h1
            style={{
              position: "absolute",
              bottom: "4rem",
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            {queryData.data.name} heardle
          </h1>
        </div>
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

function correctQuery(url: NextRequest["nextUrl"]) {
  // found some sites encode this link as http://.../api/ogGenerator?name=whatever&amp;thumbnail=blabla
  if (url.searchParams.has("thumbnail")) return url.searchParams;
  const formatted = url.search
    .replaceAll("&amp%3B", "&")
    .replaceAll("&amp;", "&");
  return new URLSearchParams(formatted);
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
