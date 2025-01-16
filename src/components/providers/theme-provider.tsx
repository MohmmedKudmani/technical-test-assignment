"use client";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

// Create a theme instance.
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

// Create a theme provider.
function ThemeProvider({ children }: Props) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;

