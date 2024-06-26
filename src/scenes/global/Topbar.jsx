import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import { put } from "../../data/service/api";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SettingsProfile from "./SettingsPrifile";
import { useAuth } from '../../uath/AuthenticationContex';


function Topbar({}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);

  const handleClick = (event, option) => {
    (option === 'notifications') && setAnchorEl(event.currentTarget);
    (option === 'logout') && setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };

  function handleLogout (){

    logout();
    console.log('User logged out');
    handleClose();
  }

  const notificationLinkCss = {color:  colors.notificationLinks[100], textDecoration: "none"};

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  function handleSaveTheme() {
    const { id } = JSON.parse(localStorage.getItem("LoggedInUserDetails"));
    colorMode.toggleColorMode();
    const newTheme = theme.palette.mode === "dark" ? "light" : "dark";
    // post("users", {record : {theme: theme.palette.mode}});
    put({ table: "users", id, updateRecord: { theme: newTheme } });
  }

  function handleAppDocumentation(){
    navigate('/documentation');
  }

  const open2 = Boolean(anchorE2);
  const id2 = open ? 'logout-popover' : undefined;



  return (isAuthenticated &&  <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "background.default",
          }}
        >
          {/* START SEARCH BAR */}

          <Box
            sx={{
              display: "flex",
              backgroundColor: colors.primary[400],
              borderRadius: "3px",
            }}
          >
            <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
            <IconButton type="button" sx={{ p: 1 }} title="Search">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* END SEARCH BAR */}

          {/* START ICONS */}

          <Box sx={{ display: "flex", alignItems: "center" }}>

          <IconButton sx={{ mr: 2 }} onClick={handleAppDocumentation} title="Documantation">
            
                <TextSnippetIcon />
           
            </IconButton>


            <IconButton sx={{ mr: 2 }} onClick={handleSaveTheme} title="Theme">
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton
              sx={{ mr: 2 }}
              aria-label="notifications"
              aria-describedby={id}
              onClick={(event)=>handleClick(event, 'notifications')}
              title="Notifications"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ p: 2 }}> <Link to='/form' style={notificationLinkCss}>Notification 1 </Link> </Typography>
              <Typography sx={{ p: 2 }}> <Link style={notificationLinkCss}>Notification 2 </Link> </Typography>
              <Typography sx={{ p: 2 }}> <Link style={notificationLinkCss}>Notification 3 </Link> </Typography>
            </Popover>

           <SettingsProfile />

            <IconButton aria-label="logout" aria-describedby={id2}  onClick={(event)=>handleClick(event, 'logout')} title="Logout">
        <LogoutIcon />
      </IconButton>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorE2}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure you want to logout?</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
          <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mr: 1 }}>
            Yes
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            No
          </Button>
        </div>
      </Popover>
          </Box>
        </Box>
      </Box>
  
  );
}

export default Topbar;
