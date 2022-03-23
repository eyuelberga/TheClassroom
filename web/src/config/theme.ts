import { extendTheme } from "@chakra-ui/react";
const overrides = {
  components: {
    Text: {
      baseStyle: {
        fontFamily: "Inter",
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Inter",
        fontWeight: "600",
      },
      sizes: {
        small: {
          fontSize: "20px",
        },
        medium: { fontSize: "25px" },
        large: { fontSize: "30px" },
      },
    },
  },
};

const theme = extendTheme(overrides);
export default theme;
