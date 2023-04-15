import Image, { ImageProps } from "next/image";
const Logo = ({ ...props }: Omit<ImageProps, "src">) => {
  return <Image alt="Riffify" src={"/riffify.svg"} {...props} />;
};

export default Logo;
