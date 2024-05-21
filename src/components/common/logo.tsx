import Image from "next/image";
import { HTMLAttributes } from "react";

const Logo = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Image src="/dark-logo.svg" alt="" className="!relative w-full h-full flex dark:hidden" fill />
      <Image src="/light-logo.svg" alt="" className="!relative w-full h-full hidden dark:flex" fill />
    </div>
  );
};

export default Logo;