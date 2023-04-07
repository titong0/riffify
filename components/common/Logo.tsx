import Image, { ImageProps } from "next/image";
const Logo = ({ ...props }: Partial<ImageProps>) => {
  return (
    <Image
      height={50}
      width={50}
      alt="Riffify"
      src={"/riffify.svg"}
      {...props}
    />
  );
};

export default Logo;
