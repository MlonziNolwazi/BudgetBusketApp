

import { tokens } from "../../theme";
import { Typography, useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Link to={to} style={{ color: colors.grey[100], textDecoration: "none" }}>
          <Typography>{title}</Typography>
        </Link>
      </MenuItem>
    );
  };


  const selectedItemIcon = (icon) => {
  
      switch (icon) {
        case "HomeOutlinedIcon":
          return <HomeOutlinedIcon />;
        case "PeopleOutlinedIcon":
          return <PeopleOutlinedIcon />;
        case "ReceiptOutlinedIcon":
          return <ReceiptOutlinedIcon />;
        case "PersonOutlinedIcon":
          return <PersonOutlinedIcon />;
        case "HelpOutlineOutlinedIcon":
          return <HelpOutlineOutlinedIcon />;
        case "MenuOutlinedIcon":
          return <MenuOutlinedIcon />;
        default:
          return <HomeOutlinedIcon />;
      }
    };
  export { Item, selectedItemIcon } ;