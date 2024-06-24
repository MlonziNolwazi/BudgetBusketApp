import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import MenuItems from "../partials/sidebar/MenuItems";
import { Item } from "../global/MenuItemHelper";
import Profile from "../partials/sidebar/Profile";

import { menuItemsData as menuItems  } from "../../data/mockData";



const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userRole, setUserRole] = useState("customer");

  const sidebarContainerCss = {
    "& .ps-sidebar-container": {
      background: `${colors.primary[400]} !important`,
      height: `calc(100vh - 5px)`,
    },
    "& .css-11xf66s-MuiTypography-root": {
      borderBottom: `1px solid #a1a4ab !important;`,
    },
    "& .css-z6ikeo-MuiTypography-root": {
      borderBottom: `1px solid #a4a9fc !important;`,
    },
  };
  const menuItemCss = {
    button: {
      // the active class will be added automatically by react router
      // so we can use it to style the active menu item
      [`&.ps-active`]: {
        backgroundColor: `${colors.backgroundActive} !important`,
        color: "#6870fa",
      },
      [`&.ps-menu-button:hover`]: {
        backgroundColor: `${colors.primary[200]} !important`,
        color: `${colors.primary[400]} !important`,
      },
      [`&.css-11xf66s-MuiTypography-root`]: {
        borderBottom: `1px solid #a4a9fc !important;`,
      },
    },
  };


  return (
    <Box
      sx={sidebarContainerCss}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu
          iconShape="square"
          menuItemStyles={menuItemCss}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  LoggedIn as <span style={{ fontWeight: "bold" }}> Admin</span>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
           <Profile username="Nolwazi Ruth Mlonzi" />
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<InsertChartOutlinedOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {
              menuItems.map((menu, i) => {
           
                return (menu.userRole.includes( userRole)) && <MenuItems 
                      key={menu.id}
                      title={menu.title}
                      items={menu.items}
                      selected={selected}
                      setSelected={setSelected}
                      userRole={userRole}
                    /> 
                
             

              })
            }
            {/*

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Manage Users"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Security
            </Typography>
            <Item
              title="Roles"
              to="/invoices"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Permission"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Lists
           

            <Item
              title="Grocery List Uploads"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Store Product Lists"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              User Queries
            </Typography>
            <Item
              title="Chats"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>
            <Item
              title="System Users"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Budget Busket Lists"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />*/}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
