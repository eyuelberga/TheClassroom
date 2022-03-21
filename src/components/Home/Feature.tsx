import React from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";
import { FeatureProps } from "./props";
const Feature: React.FC<FeatureProps> = ({ title, icon }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
    </Stack>
  );
};
export default Feature;
