import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function BreadCrumbs({ Title, Subtitle }) {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontSize: "22px" }} variant="h6" color="inherit">
        {Title}
      </Typography>
      <Typography variant="body1" color="inherit" fontSize={"small"}>
        {Subtitle}
      </Typography>
    </Box>
  );
}

export default BreadCrumbs;
