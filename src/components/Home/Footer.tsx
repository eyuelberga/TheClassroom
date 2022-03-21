import React from "react";
import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import LogoImage from "../../assets/logo.png";

const Footer: React.FC<Record<string, never>> = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <Image src={LogoImage} alt="logo" h={10} />
        <Stack direction="row" spacing={6}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text textAlign="center">{`© ${new Date().getFullYear()} The Classroom. All rights reserved`}</Text>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
