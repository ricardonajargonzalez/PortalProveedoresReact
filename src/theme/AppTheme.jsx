// import { ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme, grayTheme } from "./purpleTheme";



export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={grayTheme }>
        
        <CssBaseline />

        { children }
    </ThemeProvider>
  )
}
