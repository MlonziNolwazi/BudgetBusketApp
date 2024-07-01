import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from '@mui/material';
import { useState, useEffect } from "react";
import AddForm from "./forms/New";

function Roles(){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
      

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Description",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "accessLevel",
            headerAlign: "center",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                    access === "admin"
                    ? colors.greenAccent[600]
                    : access === "store"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[800]
                }
                borderRadius="4px"
                >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "store" && <SecurityOutlinedIcon />}
                {access === "customer" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {access}
                </Typography>
                </Box>
            );
            },
        },
        ];


        return (<Box m="20px">
            <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="flex-start" marginBottom={2} style={{ border: "0px inset #ccc" }}>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ margin: "10px" }}
            startIcon={<AddCircleOutlineIcon />} 
            onClick={handleOpen}
          >
            Add New Role
          </Button>
        </Box>
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>

      <Dialog open={open} onClose={handleClose}   fullWidth maxWidth='lg'>
        <DialogTitle>New Form </DialogTitle>
        <DialogContent>
          <AddForm title={'Add New Role'} />
        </DialogContent>
        <DialogActions style={{margin: "10px"}}>
        <Button onClick={handleClose} color="secondary">Close</Button>
        <Button type="submit"  color="secondary" variant="contained">Submit</Button>
      </DialogActions>
      </Dialog>
          </Box>
        );
}

export default Roles;