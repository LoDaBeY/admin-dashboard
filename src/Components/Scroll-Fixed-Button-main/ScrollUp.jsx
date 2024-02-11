import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Zoom, useScrollTrigger } from "@mui/material";
import { useCallback } from "react";

function ScrollUp() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const trigger = useScrollTrigger();
  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        // Place the button in the bottom right corner.
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="success"
          size="small"
          aria-label="Scroll back to top"
        >
          <KeyboardArrowUp fontSize="small" />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollUp;
