import Image, { ImageProps } from "next/image";
const Logo = ({ ...props }: Omit<ImageProps, "src" | "alt">) => {
  return <Image alt="Riffify" src={"/riffify.svg"} {...props} />;
};

export default Logo;
