import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title,staticSubtitle, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="20px"  width="calc(100% - 300px);">
      
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
       
      >
        {title}{title?.toLowerCase() === 'dashboard' && <span style={{width:"400px"}}> {staticSubtitle?.toUpperCase()}</span>}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]} style={{display:"flex"}}>
       {title?.toLowerCase() === 'dashboard' && <div><marquee><span style={{color :colors.grey[200]}}>{subtitle + subtitle + subtitle }</span> </marquee></div>}
       {console.log(title)}
      </Typography>
    </Box>
  );
};

export default Header;
