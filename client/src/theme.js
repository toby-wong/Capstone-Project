import { createTheme } from "@mui/material";

const colors = {
  green: "#3da886",
  dark: "#353837",
  light: "#f7f7f7",
  purple: "#7e78d2",
  red: "#ef6461",
  background: "#ffffff",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.purple,
    },
    danger: {
      main: colors.red,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: colors.light,
        },
      },
    },
  },
});
