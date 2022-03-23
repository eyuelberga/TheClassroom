import React from "react";
import { Stack } from "@chakra-ui/react";
import UserDisplay from "./UserItem";
import EmptyPlaceholder from "../App/EmptyPlaceholder";
import UserDisplaySkeleton from "./UserItemSkeleton";
import { alert } from "../../utils";
import { UserListProps } from "./props";
import AsyncRender from "../App/AsyncRender";

const UserList: React.FC<UserListProps> = ({
  loading,
  queries,
  data,
  error,
  header: Header,
  footer: Footer,
  onRemove,
  onEdit,
  onPreview,
  link,
  hideDetails,
  smallFont,
}) => {
  const Users = () => {
    return (
      <>
        {Header}
        {data?.map(({ id, username, fullname, profilePicture }) => (
          <UserDisplay
            link={
              link
                ? `${link}/${username}${queries ? `?${queries}` : ""}`
                : undefined
            }
            smallFont={smallFont}
            id={id}
            key={id}
            username={username}
            fullname={fullname}
            profilePicture={profilePicture}
          />
        ))}
        {Footer}
      </>
    );
  };
  const displayUsers = () => {
    if (data?.length) {
      return Users();
    }
    return undefined;
  };
  return (
    <Stack spacing={4} id="UserList">
      <AsyncRender
        loading={loading}
        skeleton={[1, 2, 3, 4].map((x) => (
          <UserDisplaySkeleton key={x} />
        ))}
        data={displayUsers()}
        alert={alert(error)}
        fallback={<EmptyPlaceholder icon="file" title="Nothing Here!" />}
      />
    </Stack>
  );
};

export default UserList;
