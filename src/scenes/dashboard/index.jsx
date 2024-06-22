import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import ChartsRow1 from "../partials/dashboard/row1/charts";
import ChartRow2 from "../partials/dashboard/row2/Charts";
import ChartRow3 from "../partials/dashboard/row3/Charts";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Change profile picture   | Notifications  | Application documentation | " staticSubtitle=" - upcoming features." />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
      <ChartsRow1/>

        {/* ROW 2 */}
        <ChartRow2/>

        {/* ROW 3 */}
        <ChartRow3/>
      
      </Box>
    </Box>
  );
};

export default Dashboard;
