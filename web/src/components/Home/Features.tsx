import React from "react";
import {
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FeaturesProps } from "./props";
import Feature from "./Feature";

const Features: React.FC<FeaturesProps> = ({ features, image }) => {
  return (
    <SimpleGrid py="10" px="6" columns={{ base: 1, md: 2 }} spacing={10}>
      <Stack spacing={4}>
        <Heading>A better way to organize your classes</Heading>
        <Text color={"gray.500"} fontSize={"lg"}>
          The Classroom helps you communicate with your students easily
        </Text>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.100", "gray.700")}
            />
          }
        >
          {features.map(({ title, icon }) => {
            return <Feature title={title} icon={icon} key={title} />;
          })}
        </Stack>
      </Stack>
      <Flex>
        <Image shadow="lg" alt="feature image" src={image} objectFit="cover" />
      </Flex>
    </SimpleGrid>
  );
};

export default Features;
