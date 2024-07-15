import React, { useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Box, useTheme, Typography, ListItemButton, Badge  } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { tokens } from '../../theme';
import Classes from './ChartPage.module.css';
import { styled } from '@mui/material/styles';

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  cursor: 'pointer',
  marginRight: "10px",
  color:  selected ? '#fff !important' : 'inherit', // Text color for selected item
  backgroundColor: selected ? '#d3d3d3' : 'inherit', // Highlight color for selected item
}));

const CustomBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
 
    color: 'white',
  },
}));
let prevUserId = null;
const UserProfile = ({ users, onSelectUser, unreadMsgs }) => {
  const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [selectedUserId, setSelectedUserId] = useState(null);
   //const classes = useStyles();

   const handleSelectUser = (id, userId) => {
    setSelectedUserId(id);
    debugger
    userId === prevUserId ? onSelectUser(userId, true) : onSelectUser(userId);
    prevUserId = userId;
  };

 

  return (
    <Box>
      <Box style={{ display: 'block', flexDirection: 'row', textAlign: 'center', justifyContent: 'space-between', padding: '10px', marginRight: '10px', backgroundColor: colors.blueAccent[700] }}>
        <Typography variant='h4' style={{ textAlign: 'center', fontWeight: "bold" }}>User Contacts</Typography>
      </Box>

      {users.length === 0 ? (
        <Box style={{ display: 'block', flexDirection: 'row', textAlign: 'center', justifyContent: 'space-between', padding: '10px', marginRight: '10px', color: colors.blueAccent[700] }}>
          <Typography variant='h6' style={{ textAlign: 'center', fontWeight: "normal", fontStyle: 'italic' }}>No User Contacts.</Typography>
        </Box>
      ) : (
        <List style={{ display: 'block', flexDirection: 'row', justifyContent: 'space-between' }}>
          {users.map((user) => {
            const unreadCount = unreadMsgs(user.user_id);
            console.log("unreadCount", unreadCount);
            return (
              <StyledListItemButton
                key={user.id}
                onClick={() => handleSelectUser(user.id, user.user_id)}
                selected={selectedUserId === user.id}
                className={Classes.ListItem}
              >
               <ListItemAvatar>
                  <Box position="relative" display="inline-flex">
                    {unreadCount > 0 ? (
                      <CustomBadge badgeContent={unreadCount} overlap="circular" color="success">
                        <Avatar
                          style={{
                            objectFit: 'cover',
                            width: 45,
                            height: 45,
                            borderRadius: '100%',
                          }}
                        />
                      </CustomBadge>
                    ) : (
                      <Avatar
                        style={{
                          objectFit: 'cover',
                          width: 45,
                          height: 45,
                          borderRadius: '100%',
                        }}
                      />
                    )}
                  </Box>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </StyledListItemButton>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default UserProfile;
