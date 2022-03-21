import React from "react";
import { Spinner, Image, Flex, VStack } from "@chakra-ui/react";
import LogoImage from "../../assets/logo.png";
const Loader: React.FC<Record<string, never>> = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <VStack>
        <Image src={LogoImage} alt="logo" h={150} />
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.600"
          size="xl"
        />
      </VStack>
    </Flex>
  );
};
export default Loader;
