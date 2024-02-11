import ScrollUp from "./Components/Scroll-Fixed-Button-main/ScrollUp";
import AppBarr from "./Components/AppBar";
import { useMemo, useState } from "react";
import {  ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./Theme/Theme";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("currentTheme")
      ? localStorage.getItem("currentTheme")
      : "light"
  );

  //Don't forget to update the header with passing SetMode to his MainComponent

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppBarr setMode={setMode} />
      <ScrollUp />
    </ThemeProvider>
  );
}

export default App;
