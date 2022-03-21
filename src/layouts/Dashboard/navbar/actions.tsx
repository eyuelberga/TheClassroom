import React from "react";
import { Stack } from "@chakra-ui/react";
import AccountMenu from "../../../components/App/AccountMenu";

const ActionsList: React.FC<Record<string, any>> = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={[2, 6]}>
      <AccountMenu />
    </Stack>
  );
};

export default ActionsList;
