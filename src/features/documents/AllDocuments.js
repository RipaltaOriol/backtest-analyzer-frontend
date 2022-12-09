import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAllDocuments } from './documentSlice';
import {
    useGetDocumentsQuery,
    useCloneDocumentMutation,
    useRenameDocumentMutation,
    useDeleteDocumentMutation,
} from './documentSlice';

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
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import Upload from 'pages/upload';

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
    },
})

const DocumentSource = styled(Typography)({
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#84919A'
  })

const AllDocuments = () => {

    let navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [newName, setNewName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [openUpload, setOpenUpload] = useState(false);
    const open = Boolean(anchorEl);

    const handleUploadOpen = () => {
        setOpenUpload(true);
    };
    
    const handleUploadClose = () => {
        setOpenUpload(false);
    };

    const handleClick = (id, event) => {
        setDocumentId(id)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setDocumentId(null);
        setAnchorEl(null);
    };
  
    const handleRenameClose = (id) => {
        setAnchorEl(null);
        setOpenDialog(true);
    };

    const handleCopyClose = (id) => {
        cloneDocument({ id: documentId });
        setAnchorEl(null);
    };

    const handleDeleteClose = () => {
        setAnchorEl(null);
        deleteDocument({ id: documentId });
    };

    const handleDialogClose = () => {
        setDocumentId(null);
        setNewName('');
        setOpenDialog(false);
    };

    const handleChangeName = () => {
        renameDocument({ id: documentId, name: newName });
        setOpenDialog(false);
    };

    const {
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetDocumentsQuery()

    const orderedDocuments = useSelector(selectAllDocuments)

    const [cloneDocument] = useCloneDocumentMutation();
    const [renameDocument] = useRenameDocumentMutation();
    const [deleteDocument] = useDeleteDocumentMutation();

    let content;

    if (isLoading) {
        content = <></>;
    } else if (isSuccess) {
        
        content = orderedDocuments.map((doc, idx) => (
                <Grid item xs={6} lg={4} xl={3} sx={{ backgroundColor: 'none' }}>
                    <DocumentItem>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: '6px', mr: 2, border: '1px solid #E5E9EB' }}>
                                <TextSnippetIcon sx={{ color: '#84919A' }} />
                            </Box>
                            <Box>
                                <Typography>
                                    {doc.name}
                                </Typography>
                                <DocumentSource>
                                    {doc.source}
                                </DocumentSource>
                            </Box>
                        </Box>
                        <IconButton
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(e) => handleClick(doc.id, e)}
                        >
                            <MoreHorizIcon sx={{ color: '#252C32' }} />
                        </IconButton>
                    </DocumentItem>
                </Grid>
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    console.log(content);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5'>All Documents</Typography>
                <Button
                    color="primary"
                    variant='contained'
                    onClick={handleUploadOpen}
                >
                    Upload New Document
                </Button>
            </Box>
            <Divider sx={{ mt: 2, mb: 4 }}/>
            <Box sx={{ flexGrow: 1 }}>
            { content.length > 0 &&
                <DocumentGrid container>
                    {content}
                </DocumentGrid>
            }
            

            </Box>
            <Upload
                open={openUpload}
                onClose={handleUploadClose}
            />
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ color: 'inherit' }}>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        Rename File
                    </Typography>
                </DialogTitle>
                <DialogContent>
                <DialogContentText sx={{ fontSize: '14px' }}>
                    To change the name of the current file write the new name for this
                    document:
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
                autoFocus={false}
                elevation={0}
                sx={{
                    list: { padding: 0 },
                    '& .MuiPaper-root': {
                        border: '1px solid #DDE2E4'
                    },
                }}
            >
                <DocumentMenuItem onClick={handleRenameClose}>
                    <ListItemIcon sx={{ minWidth: '30px !important' }} >
                        <DriveFileRenameOutlineRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Rename</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem onClick={() => navigate('update/' + documentId)}>
                    <ListItemIcon sx={{ minWidth: '30px !important' }} >
                        <UpdateRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem onClick={handleCopyClose}>
                    <ListItemIcon sx={{ minWidth: '30px !important' }} >
                        <FileCopyRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                </DocumentMenuItem>
                <DocumentMenuItem onClick={handleDeleteClose}>
                    <ListItemIcon sx={{ minWidth: '30px !important' }} >
                        <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </DocumentMenuItem>
            </Menu>
        </Box>
    )
}

export default AllDocuments;