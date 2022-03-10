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
      contrastText: colors.light,
    },
    secondary: {
      main: colors.purple,
      contrastText: colors.light,
    },
    container: {
      main: colors.light,
    },
    warning: {
      main: colors.red,
      contrastText: colors.light,
    },
    text: {
      primary: colors.green,
      secondary: colors.dark,
      warning: colors.red,
      disabled: colors.light,
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    brandName: {
      fontFamily: "Bungee",
      fontSize: "2rem",
      lineHeight: 1,
      marginLeft: 7,
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
