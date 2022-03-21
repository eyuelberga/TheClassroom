import { Container, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function Simple() {
  return (
    <Container h="90vh">
      <VStack spacing={{ base: 4, sm: 6 }}>
        <Text
          color={useColorModeValue("gray.500", "gray.400")}
          fontSize={"2xl"}
          fontWeight={"300"}
        >
          About The Classroom
        </Text>
        <Text fontSize={"lg"}>
          The Classroom is an open-source LMS(Learning Management System)
        </Text>
      </VStack>
    </Container>
  );
}
