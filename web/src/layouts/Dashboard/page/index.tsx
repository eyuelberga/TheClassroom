import React from "react";
import { Box } from "@chakra-ui/react";

const Page: React.FC<Record<string, any>> = ({ children }) => {
  return <Box w="full">{children}</Box>;
};

export default Page;
