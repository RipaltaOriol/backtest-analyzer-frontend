import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useGetDocumentSetupsQuery } from '../documents/documentsApiSlice';
import {
    useGetDocumentsQuery,
} from '../documents/documentsApiSlice';
import {
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation,
} from './setupsSlice';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import { styled } from '@mui/system';

const DocumentGrid = styled(Grid)({
    backgroundColor: '#F6F8F9',
    border: '1px solid #E5E9EB',
    borderRadius: '6px',
    padding: 2
})

const DocumentItem = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#D7EDFF'
    }
})

const DocumentMenuItem = styled(MenuItem)({
    borderRadius: '6px',
    '&:hover': {
        color: '#0E73F6',
        backgroundColor: '#D7EDFF',
    }
})

const AllSetups = () => {

    const location = useLocation();
    const [openDialog, setOpenDialog] = useState(false);
    const [newName, setNewName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [setupId, setSetupId] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (id, event) => {
        setSetupId(id)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setSetupId(null);
        setAnchorEl(null);
    };

    const handleRenameClose = (id) => {
        setAnchorEl(null);
        setOpenDialog(true);
    };

    const handleDeleteClose = () => {
        setAnchorEl(null);
        deleteSetups({ setupId });
    };

    const handleDialogClose = () => {
        setSetupId(null);
        setNewName('');
        setOpenDialog(false);
    };

    const handleChangeName = () => {
        updateSetups({ setupId, name: newName });
        setOpenDialog(false);
    };

    const {
        data: orderedDocuments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDocumentSetupsQuery()


    const [addSetups] = useAddSetupsMutation()
    const [updateSetups] = useUpdateSetupsMutation()
    const [deleteSetups] = useDeleteSetupsMutation()    

    const populateDocumentSetups = (setups) => {
        return (
            <DocumentGrid container sx={{ mb: 3 }}>
            { setups ? setups.map((setup) => (
                <Grid item xs={6} lg={4} xl={3} sx={{ backgroundColor: 'none' }}>
                    <DocumentItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: '6px', mr: 2, border: '1px solid #E5E9EB' }}>
                                <TextSnippetIcon sx={{ color: '#84919A' }} />
                            </Box>
                            <Typography>
                                {setup.name}
                            </Typography>
                        </Box>
                        
                        <IconButton
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(e) => handleClick(setup.id, e)}
                        >
                            <MoreHorizIcon sx={{ color: '#252C32' }} />
                        </IconButton>
                        
                    </DocumentItem>
                </Grid>
            )) : null }
            </DocumentGrid>
        )
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5'>All Setups</Typography>
                <Button color="primary" variant='contained'>Add New Setup</Button>
            </Box>
            <Divider sx={{ mt: 2, mb: 4 }}/>
            <Box sx={{ flexGrow: 1 }}>
                { orderedDocuments ? orderedDocuments.map((doc) => (
                    <Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant='caption'>{doc.name}</Typography>
                        </Box>
                        {populateDocumentSetups(doc.setups)}
                    </Box>
                )) : null }
            </Box>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ color: 'inherit' }}>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        Rename Setup
                    </Typography>
                </DialogTitle>
                <DialogContent>
                <DialogContentText sx={{ fontSize: '14px' }}>
                    To change the name of the current setup write the new name for this
                    setup:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={newName}

                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewName(e.target.value)}
                />
                </DialogContent>
                <DialogActions sx={{ mb: 1, px: 3 }}>
                    <Button onClick={handleDialogClose} variant="text">Cancel</Button>
                    <Button onClick={handleChangeName} variant="contained">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ color: 'inherit' }}>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        Add New Setup
                    </Typography>
                </DialogTitle>
                <DialogContent>
                <DialogContentText sx={{ fontSize: '14px' }}>
                    Indicate for which document is this setup and what name should it have:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={newName}

                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewName(e.target.value)}
                />
                </DialogContent>
                <DialogActions sx={{ mb: 1, px: 3 }}>
                    <Button onClick={handleDialogClose} variant="text">Cancel</Button>
                    <Button onClick={handleChangeName} variant="contained">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                autoFocus={false}
                sx={{ list: { padding: 0 } }}
            >
                <DocumentMenuItem onClick={handleRenameClose}>
                    <ListItemIcon>
                        <DriveFileRenameOutlineRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Rename</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem>
                    <ListItemIcon sx={{ minWidth: '30px !important' }} >
                        <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </DocumentMenuItem>
            </Menu>
        </Box>
    )
}

export default AllSetups;