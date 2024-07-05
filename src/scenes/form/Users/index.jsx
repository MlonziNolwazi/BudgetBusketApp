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
import { Password } from "@mui/icons-material";
import { updateCurrentUser } from "../../../uath/firebase";
import { getAuth,  updateEmail, updatePassword, createUserWithEmailAndPassword ,EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { update } from "firebase/database";


function Users() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false); // State for handling view action
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for handling delete confirmation
    const [rows, setRows] = useState([]);
    const [editRow, setEditRow] = useState(null); // State to keep track of the row being edited
    const [deleteRowId, setDeleteRowId] = useState(null); // State to keep track of the row being deleted
    const auth = getAuth();
     // Get the currently authenticated user
     const user = auth.currentUser;
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
        get({ table: "users" }).then((data) => {
            const newRows = data.map((row) => {
                return {
                    id: row.id,
                    firstname: row.firstname,
                    lastname: row.lastname || "N/A",
                    gender: row.gender,
                    email: row.email,
                    role: row.role,
                    contact: row.contact,
                    address: row.address

                };
            });
            console.log('newRows data', newRows);
            setRows(newRows);
        });
    }, []);
    
    const handleFormSubmit = (formData) => {
        // Handle form submission logic
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            post({ table: "users", record: formData }).then((record) => {
                    // Add new row
                    setRows([...rows, record]);
                    enqueueSnackbar("User added successfully", { variant: "success" });
                
            }).catch((error) => {
                console.error("Error adding User: ", error);
                enqueueSnackbar("Error adding User", { variant: "error" });
            }).finally(() => {
                handleClose();
            });
        }).catch((error) => {
            console.error("Error adding User: ", error);
            enqueueSnackbar("Error adding User", { variant: "error" });
        });
    };



    const handleEditSubmit = async (formData) => {
        console.log(user,'--edited form data', formData);
      
        try {
         // const user = auth.currentUser;
      
          if (user) {

            // Reauthenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        formData.oldPassword // Prompt the user for their current password
      );

      await reauthenticateWithCredential(user, credential);

            // Update user's email and password
            if (formData.email && formData.email !== user.email) {
              await updateEmail(user, formData.email);
            }
      
            if (formData.password) {
              await updatePassword(user, formData.password);
            }
      
      
            // Update the user record in your database
            try {
              const updatedRecord = await put({ table: "users", id: formData.id, updateRecord: formData });
              setRows(rows.map((row) => (row.id === formData.id ? formData : row)));
              enqueueSnackbar("User updated successfully", { variant: "success" });
            } catch (error) {
              console.error("Error updating User in database: ", error);
              enqueueSnackbar("Error updating User in database", { variant: "error" });
            } finally {
              handleClose();
            }
          } else {
            throw new Error("No user is currently signed in.");
          }
        } catch (error) {
          console.error("Error updating user:", error);
          enqueueSnackbar("Error updating user", { variant: "error" });
        }
      };

    const handleEdit = (id) => {
        const recordToEdit = rows.find((row) => row.id === id);
        
        console.log('edited record', recordToEdit);
        setEditRow(recordToEdit);
        setOpen(true);
    };

    const handleDelete = (id) => {
        remove({ table: "users", id: id }).then(() => {

            setRows(rows.filter((row) => row.id !== id));
            enqueueSnackbar("User deleted successfully", { variant: "success" });

        }).catch((error) => {

            console.error("Error deleting record: ", error);
            enqueueSnackbar("Error deleting User", { variant: "error" });

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
            field: "firstname",
            headerName: "FirstName",
            hide: true, // Hide the column
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "lastname",
            headerName: "LastName",
            type: "text",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "contact",
            headerName: "Phone No.",
            hide: true, // Hide the column
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            type: "text",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            hide: true, // Hide the column
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "gender",
            headerName: "Gender",
            type: "text",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            hide: true, // Hide the column
            cellClassName: "name-column--cell",
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
                <Header title="Users" subtitle="List of Users" />
                <Box display="flex" justifyContent="flex-start" marginBottom={2} style={{ border: "0px inset #ccc" }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ margin: "10px" }}
                        startIcon={<AddCircleOutlineIcon />} 
                        onClick={handleOpen}
                    >
                        Add New User
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
                        <EditForm onClose={handleClose} title="Edit User" handleSubmit={handleEditSubmit} initialValues={editRow} />
                    ) : (
                        <AddForm onClose={handleClose} title="Add New User" handleSubmit={handleFormSubmit} />
                    )}
                </DialogContent>
                
            </Dialog>

            <Dialog open={viewOpen} onClose={handleViewClose} fullWidth maxWidth="md">
                <DialogTitle>View User Level</DialogTitle>
                <DialogContent>
                    <Typography variant="body1"><strong>ID:</strong> {editRow?.id}</Typography>
                    <Typography variant="body1"><strong>FirstName:</strong> {editRow?.firstname}</Typography>
                    <Typography variant="body1"><strong>LastName:</strong> {editRow?.lastname}</Typography>
                    <Typography variant="body1"><strong>Role:</strong> {editRow?.role}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {editRow?.email}</Typography>
                    <Typography variant="body1"><strong>Gender:</strong> {editRow?.gender}</Typography>
                    <Typography variant="body1"><strong>Phone No:</strong> {editRow?.contact}</Typography>
                    <Typography variant="body1"><strong>Address:</strong> {editRow?.address}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={handleViewClose} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this User?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDeleteClose} color="secondary">Cancel</Button>
                    <Button onClick={() => handleDelete(deleteRowId)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Users;
