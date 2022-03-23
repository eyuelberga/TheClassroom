import React from "react";
import { Flex, Spacer, Stack } from "@chakra-ui/react";
import Actions from "./actions";
import Info from "./info";

const Navbar: React.FC<Record<string, any>> = () => {
  return (
    <Flex
      layerStyle="card"
      h="4.5rem"
      shadow="md"
      sx={{ position: "sticky", top: 0 }}
      bg="white"
      zIndex={1000}
      p={5}
    >
      <Stack direction="row" w="full" alignItems="center" spacing={[0, 8]}>
        <Info />
      </Stack>
      <Spacer />
      <Actions />
    </Flex>
  );
};

export default Navbar;
