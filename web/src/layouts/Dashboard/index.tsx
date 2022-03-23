import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Navbar from "./navbar";
import Page from "./page";

interface SiteLayoutProps {
  children?: any;
  minimal?: boolean;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children, minimal }) => {
  return (
    <Box textStyle="light">
      <Navbar />
      <Box pos="relative" h="max-content" m={[2, 5]}>
        <Stack direction="row" spacing={{ md: 5 }}>
          <Page>{children}</Page>
        </Stack>
      </Box>
    </Box>
  );
};

export default SiteLayout;
