import { Box, useTheme } from "@mui/material";
import TreeChart from "../../components/TreeChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";

function Tree() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Box m="20px">
        <Header title="Tree" subtitle="Simple Tree Chart" />
  
        <Box
          height="75vh"
          border={`1px solid ${colors.grey[100]}`}
          borderRadius="4px"
        >
          <TreeChart />
        </Box>
      </Box>
    );
  };

export default Tree;