import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

const SessionDisplaySkeleton: React.FC<Record<string, any>> = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" h={300}>
      <Skeleton height="30px" my="2" width="100px" />
      <Stack direction="row" my="2">
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="100px" />
      </Stack>
      <SkeletonText my="2" noOfLines={2} />
    </Box>
  );
};
export default SessionDisplaySkeleton;
