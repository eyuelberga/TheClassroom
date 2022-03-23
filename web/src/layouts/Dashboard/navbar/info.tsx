import React from "react";
import { Link } from "react-router-dom";
import { Stack} from "@chakra-ui/react";
import Logo from "../logo";

const Info = () => {
  return (
    <Link to="/app">
      <Stack direction="row" alignItems="center" display={["none", "flex"]}>
        <Logo />
      </Stack>
    </Link>
  );
};

export default Info;
