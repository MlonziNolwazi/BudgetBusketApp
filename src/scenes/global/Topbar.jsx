
import {Box, IconButton, useTheme} from '@mui/material';
import { useContext } from 'react';
import {ColorModeContext, tokens} from '../../theme';
import InputBase from '@mui/material/InputBase';
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import  NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';
import  SettingsOutlinedIcon  from '@mui/icons-material/SettingsOutlined';
import  PersoneOutlinedIcon from '@mui/icons-material/Person2Outlined';
import  SearchIcon  from '@mui/icons-material/Search';

function Topbar({}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  console.log( "useThemeSelection", theme.palette.mode)
    return <>
    <Box>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'background.default'}}>

      {/* START SEARCH BAR */}
      
      <Box sx={{display: 'flex', backgroundColor : colors.primary[400], borderRadius: "3px" }}>
       
        <InputBase
          placeholder="Search"
          sx={{ml: 2, flex: 1}}
        />
         <IconButton type="button" sx={{p : 1}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* END SEARCH BAR */}


      {/* START ICONS */}

      <Box sx={{display: 'flex', alignItems: 'center'}}>

        <IconButton sx={{mr: 2}} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>

        <IconButton sx={{mr: 2}}>
          <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton sx={{mr: 2}}>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton>
          <PersoneOutlinedIcon />
        </IconButton>

      </Box>

    </Box>
    </Box>
    </>
  }
  
  export default Topbar;