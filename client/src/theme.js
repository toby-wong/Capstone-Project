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
    modalTitle: {
      fontSize: "30px",
    },
    modalSubtitle: {
      marginLeft: "15px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: colors.light,
          borderRadius: 20,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light,
          borderRadius: 15,
          padding: "30px 40px",
          display: "flex",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: 25,
          backgroundColor: colors.background,
          boxShadow: "10px #ef6461",
          color: colors.dark,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          display: "block",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: "10px",
          paddingLeft: "15px",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.light,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: colors.dark,
        },
      },
    },
  },
});
