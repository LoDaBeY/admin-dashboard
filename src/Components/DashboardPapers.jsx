import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

function DashboardPapers({
  Icon,
  Numberoftest,
  NumberofSales,
  Yuzdeuz,
  data,
  scheme,
}) {
  const theme = useTheme();
  return (
    <Stack direction={"row"}>
      <Paper
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "300px",
          p: "0.5rem",
          borderRadius: "10px",
          m: "4px",


        }}
        elevation={3}
      >
        <Stack gap={1} alignItems={"center"} direction={"column"}>
          <IconButton aria-label="">{Icon}</IconButton>
          <Typography variant="body2" color="inherit">
            {Numberoftest}
          </Typography>
          <Typography variant="body2" color="inherit">
            {NumberofSales}
          </Typography>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <Box sx={{ height: "100px", width: "100px" }}>
            <ResponsivePie
              data={data}
              margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              colors={{ scheme: scheme }}
              theme={{
                text: {
                  fontSize: 11,
                  fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
                axis: {
                  domain: {
                    line: {
                      stroke:
                        theme.palette.mode === "dark" ? "white" : "#1a1a00",
                      strokeWidth: 1,
                    },
                  },
                  legend: {
                    text: {
                      fontSize: 12,
                      fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#777777",
                      strokeWidth: 1,
                    },
                    text: {
                      fontSize: 11,
                      fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                    strokeWidth: 1,
                  },
                },
                legends: {
                  title: {
                    text: {
                      fontSize: 11,
                      fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                  text: {
                    fontSize: 11,
                    fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                  },
                  ticks: {
                    line: {},
                    text: {
                      fontSize: 10,
                      fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                },
                annotations: {
                  text: {
                    fontSize: 13,
                    fill: theme.palette.mode === "dark" ? "white" : "#1a1a00",
                    outlineWidth: 2,
                    outlineColor: "#ffffff",
                    outlineOpacity: 1,
                  },
                  link: {
                    stroke: "#000000",
                    strokeWidth: 1,
                    outlineWidth: 2,
                    outlineColor: "#ffffff",
                    outlineOpacity: 1,
                  },
                  outline: {
                    stroke: "#000000",
                    strokeWidth: 2,
                    outlineWidth: 2,
                    outlineColor: "#ffffff",
                    outlineOpacity: 1,
                  },
                  symbol: {
                    fill: "#000000",
                    outlineWidth: 2,
                    outlineColor: "#ffffff",
                    outlineOpacity: 1,
                  },
                },
                tooltip: {
                  container: {
                    background: "#ffffff",
                    color: "#777777",
                    fontSize: 12,
                  },
                  basic: {},
                  chip: {},
                  table: {},
                  tableCell: {},
                  tableCellValue: {},
                },
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "ruby",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "c",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "go",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "python",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "scala",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "lisp",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "elixir",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "javascript",
                  },
                  id: "lines",
                },
              ]}
            />
          </Box>
          <Typography variant="body2" color="inherit">
            %{Yuzdeuz}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default DashboardPapers;
