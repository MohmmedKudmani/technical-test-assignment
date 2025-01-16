"use client";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;

