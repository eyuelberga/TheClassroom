import React from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HeroProps } from "./props";
import LogoImage from "../../assets/logo.png";

const Hero: React.FC<HeroProps> = ({
  subtitle,
  description,
  image,
  onGetStarted,
  onHowItWorks,
}) => {
  return (
    <Flex
      w={"full"}
      h={"50vh"}
      backgroundImage={image}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align="center" spacing={6}>
          <Image filter="invert(100%)" src={LogoImage} alt="logo" h={200} />;
          <Text color="white">{subtitle}</Text>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            {description}
          </Text>
          <Stack direction={"row"}>
            <Button
              onClick={onGetStarted}
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
            >
              Get Started
            </Button>
            {onHowItWorks && (
              <Button
                onClick={onHowItWorks}
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                Learn more
              </Button>
            )}
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};
export default Hero;
