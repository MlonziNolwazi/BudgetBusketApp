

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
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import EditNotificationsOutlinedIcon from '@mui/icons-material/EditNotificationsOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';


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
        case "LockPersonOutlinedIcon":
          return <LockPersonOutlinedIcon />;

          case "HeadsetMicOutlinedIcon":
          return <HeadsetMicOutlinedIcon />;

          case "QuestionAnswerOutlinedIcon":
          return <QuestionAnswerOutlinedIcon />;

          case "StarHalfOutlinedIcon":
            return <StarHalfOutlinedIcon />;

            
            case "RateReviewOutlinedIcon":
              return <RateReviewOutlinedIcon />;

              
              case "ArticleOutlinedIcon":
                return <ArticleOutlinedIcon />;

                
          case "EditNotificationsOutlinedIcon":
          return <EditNotificationsOutlinedIcon />;

          case "ChecklistOutlinedIcon":
            return <ChecklistOutlinedIcon />;
            case "CampaignOutlinedIcon":
              return <CampaignOutlinedIcon />;
        case "AddModeratorOutlinedIcon":
          return <AddModeratorOutlinedIcon />;
        case "ReceiptOutlinedIcon":
          return <ReceiptOutlinedIcon />;
        case "PersonOutlinedIcon":
          return <PersonOutlinedIcon />;
        case "HelpOutlineOutlinedIcon":
          return <HelpOutlineOutlinedIcon />;
        case "MenuOutlinedIcon":
          return <MenuOutlinedIcon />;
          case "InsertChartOutlinedOutlinedIcon":
            
            return <InsertChartOutlinedOutlinedIcon />;
        default:
          return <HomeOutlinedIcon />;
      }
    };
  export { Item, selectedItemIcon } ;