import React from "react";
import { Image } from "@chakra-ui/react";
import LogoImage from "../../assets/logo.png";

const Logo = () => {
  return <Image src={LogoImage} alt="logo" h={10} />;
};

export default Logo;
