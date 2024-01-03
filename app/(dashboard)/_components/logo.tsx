import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <div className=" flex gap-3">
        <Image height={30} width={30} alt="logo" src="/logo.svg" />

        <div className=" font-semibold text-2xl text-violet-600">SkillSync</div>
      </div>
    </div>
  );
};

export default Logo;
