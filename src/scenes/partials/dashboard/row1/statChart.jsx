// Stat is a component that displays a statistic with an icon and a progress bar

import StatBox from "../../../../components/StatBox";

// email, point of sale, person add, and traffic icons
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

import { useTheme } from "@mui/material";

//color theme
import { tokens } from "../../../../theme";


function StatChart({ icon, ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const iconStyle = { color: colors.greenAccent[600], fontSize: "26px" };
  
  return (
    <StatBox
      {...props}
      icon={
        <>
          {icon === "email" ? (
            <EmailIcon
              sx={iconStyle}
            />
          ) : icon === "pointOfSale" ? (
            <PointOfSaleIcon
              sx={iconStyle}
            />
          ) : icon === "personAdd" ? (
            <PersonAddIcon
              sx={iconStyle}
            />
          ) : (
            <TrafficIcon
              sx={iconStyle}
            />
          )}
        </>
      }
    />
  );
}

export default StatChart;
