import Chart from "../../../../components/LineChart";
import { Box, useTheme } from "@mui/material";
import ChartHeader from "./LineChartHeader";
import { tokens } from "../../../../theme";
import { Fragment } from 'react';

function LineChart() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Fragment>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
            <ChartHeader />
            <Box height="250px" m="-20px 0 0 0">
                <Chart isDashboard={true} />
            </Box>
        </Box>

    </Fragment>
  );
}


export default LineChart;