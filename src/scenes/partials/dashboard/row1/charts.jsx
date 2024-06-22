// Stat is a component that displays a statistic with an icon and a progress bar
import StatChart from "./statChart";

// Box component is a layout component that can be used to create a grid layout
// useTheme is a custom hook that gives access to the current theme
import { Box, useTheme } from "@mui/material";

//color theme
import { tokens } from "../../../../theme";

import { layoutData } from "../../../../data/dashboardLayout";

/* Desc: Charts component for the first row of the dashboard */
function Charts() {
    
  // get the current theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {layoutData.map((data, index) => {
        return (
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatChart key={index} {...data} />
          </Box>
        );
      })}
    </>
  );
}

export default Charts;
