import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box, IconButton  } from '@mui/material';
import { useState, useEffect } from "react";
import AddForm from "./forms/New";
import { sidebarClasses } from "react-pro-sidebar";
import { get, post } from "../../../data/service/api";
import Header from "../../../components/Header";


function Roles(){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    get({ table: "roles" }).then((data) => {
      const newRows = data.map((row) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,

        };
      });
      setRows(newRows);
     
    });
    
  }, []);


  const handleFormSubmit = (formData) => {
    // Handle form submission logic
    
    //setRows([...rows, formData]);
    post({ table: "roles", record: formData }).then((record) => {
      setRows([...rows, record]);
    }).catch((error) => {
      console.error("Error adding record: ", error);
    }).finally(() => {
      handleClose();
    });
    

  };


  const handleEdit = (id) => {
    const recordToEdit = rows.find((row) => row.id === id);
    setRows(recordToEdit);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      hide: true, // Hide the column
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton color={'secondary'} onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color={'danger'} onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  
    
  return (
    <Box m="20px">
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
         <Header title="Roles" subtitle="List of Roles" />
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
        <DataGrid
         rows={rows.length > 0 ? rows : []} 
         columns={columns} 
         initialState={{
          columns: {
            columnVisibilityModel: {
              id: false, // Hide the 'name' column
            },
          },
          sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }], // Sort by 'id' in ascending order
            },
        }}
         />
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>New Form</DialogTitle>
        <DialogContent>
          <AddForm title="Add New Role" handleSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Roles;