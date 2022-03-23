import React from "react";
import { Avatar, Box, Text, Stack, Flex, Spacer, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserItemProps } from "./props";

const UserItem: React.FC<UserItemProps> = ({
  fullname,
  username,
  smallFont,
  link,
  profilePicture,
  action: Action,
}) => {
  const UserBody = (
    <Box rounded="lg" borderWidth="1px" borderRadius="lg" p={smallFont ? 2 : 4}>
      <Flex>
        <Avatar
          size={smallFont ? "sm" : "md"}
          src={profilePicture}
          name={fullname}
        />
        <Stack
          direction="column"
          spacing={0}
          fontSize={smallFont ? "xs" : "sm"}
          mx={2}
        >
          <Wrap>
            <Text noOfLines={1} fontWeight={600}>
              {fullname}
            </Text>
          </Wrap>
          <Wrap>
            <Text noOfLines={1} color="gray">
              {username}
            </Text>
          </Wrap>
        </Stack>
        <Spacer />
        <Stack direction="row">{Action}</Stack>
      </Flex>
    </Box>
  );
  return <>{link ? <Link to={link}>{UserBody}</Link> : UserBody}</>;
};
export default UserItem;
