import ScrollUp from "./Components/Scroll-Fixed-Button-main/ScrollUp";
import AppBarr from "./Components/AppBar";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./Theme/Theme";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./FirebaseConfig/firebaseConfige";

function App() {
  const [user, loading] = useAuthState(auth);

  const [mode, setMode] = useState(
    localStorage.getItem("currentTheme")
      ? localStorage.getItem("currentTheme")
      : "light"
  );

  //Don't forget to update the header with passing SetMode to his MainComponent

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <AppBarr setMode={setMode} />
        <ScrollUp />
      </ThemeProvider>
    );
  }

  if (!user) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
}

export default App;
