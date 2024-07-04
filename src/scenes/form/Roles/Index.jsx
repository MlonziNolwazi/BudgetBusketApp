import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, IconButton } from '@mui/material';
import { useState, useEffect } from "react";
import AddForm from "./forms/New";
import { get, post, remove, put } from "../../../data/service/api"; // Import delete function
import Header from "../../../components/Header";
import EditForm from "./forms/Edit";
import { enqueueSnackbar, useSnackbar} from "notistack";


function Roles() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false); // State for handling view action
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for handling delete confirmation
    const [rows, setRows] = useState([]);
    const [editRow, setEditRow] = useState(null); // State to keep track of the row being edited
    const [deleteRowId, setDeleteRowId] = useState(null); // State to keep track of the row being deleted
   // const enqueueSnackbar = useSnackbar();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditRow(null); // Reset the edit row when closing the dialog
    };

    const handleViewOpen = () => setViewOpen(true); // Open view dialog
    const handleViewClose = () => setViewOpen(false); // Close view dialog

    const handleConfirmDeleteOpen = (id) => {
        setDeleteRowId(id);
        setConfirmDeleteOpen(true);
    };

    const handleConfirmDeleteClose = () => {
        setConfirmDeleteOpen(false);
        setDeleteRowId(null);
    };

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
        post({ table: "roles", record: formData }).then((record) => {
                // Add new row
                setRows([...rows, record]);
                enqueueSnackbar("Role added successfully", { variant: "success" });
            
        }).catch((error) => {
            console.error("Error adding role: ", error);
            enqueueSnackbar("Error adding role", { variant: "error" });
        }).finally(() => {
            handleClose();
        });
    };

   const handleEditSubmit = (formData) => {
    console.log('edited form data', formData.id);
        put({ table: "roles", id :formData.id, updateRecord: formData }).then((record) => {
            setRows(rows.map((row) => (row.id === formData.id ? formData : row)));
            enqueueSnackbar("Role updated successfully", { variant: "success" });
        }).catch((error) => { 
            console.error("Error updating role: ", error);
            enqueueSnackbar("Error updating role", { variant: "error" });
        }).finally(() => {
            handleClose();

        });
      }

    const handleEdit = (id) => {
        const recordToEdit = rows.find((row) => row.id === id);
        
        console.log('edited record', recordToEdit);
        setEditRow(recordToEdit);
        setOpen(true);
    };

    const handleDelete = (id) => {
        remove({ table: "roles", id: id }).then(() => {

            setRows(rows.filter((row) => row.id !== id));
            enqueueSnackbar("Role deleted successfully", { variant: "success" });

        }).catch((error) => {

            console.error("Error deleting record: ", error);
            enqueueSnackbar("Error deleting role", { variant: "error" });

        }).finally(() => {
            handleConfirmDeleteClose();
        });
    };

    const handleView = (id) => {
        const recordToView = rows.find((row) => row.id === id);
        
        setEditRow(recordToView); // Reuse editRow state for viewing
        setViewOpen(true);
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
            align: "left",
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <div>
                    <IconButton color="secondary" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleConfirmDeleteOpen(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color="info" onClick={() => handleView(params.row.id)}>
                        <VisibilityIcon />
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
                <DialogTitle>{editRow ? "Edit Form" : "New Form"}</DialogTitle>
                <DialogContent>
                    {editRow ? (
                        <EditForm onClose={handleClose} title="Edit Role" handleSubmit={handleEditSubmit} initialValues={editRow} />
                    ) : (
                        <AddForm onClose={handleClose} title="Add New Role" handleSubmit={handleFormSubmit} />
                    )}
                </DialogContent>
                
            </Dialog>

            <Dialog open={viewOpen} onClose={handleViewClose} fullWidth maxWidth="md">
                <DialogTitle>View Role</DialogTitle>
                <DialogContent>
                    <Typography variant="body1"><strong>ID:</strong> {editRow?.id}</Typography>
                    <Typography variant="body1"><strong>Name:</strong> {editRow?.name}</Typography>
                    <Typography variant="body1"><strong>Description:</strong> {editRow?.description}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={handleViewClose} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this role?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDeleteClose} color="secondary">Cancel</Button>
                    <Button onClick={() => handleDelete(deleteRowId)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Roles;
