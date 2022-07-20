import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetSetupsQuery,
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation,
} from './setupsSlice';
import { selectSetupsByDocument } from "./setupsSlice";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DialogContentText from '@mui/material/DialogContentText';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const SetupsList = () => {

    const { documentId } = useParams()

    const [setupId, setSetupId] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [newSetupName, setNewSetupName] = useState('');

    const [addSetups] = useAddSetupsMutation()
    const [updateSetups] = useUpdateSetupsMutation()
    const [deleteSetups] = useDeleteSetupsMutation()

    const {
        setupsByDocument,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetSetupsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
          setupsByDocument: selectSetupsByDocument(data, documentId),
          isLoading,
          isError,
          isSuccess,
        }),
      })

    const handleClickOpen = (formType, id) => {
        setNewSetupName('');
        if (formType === 'update') {
            setSetupId(id);
            setOpenUpdate(true);
        }
        if (formType === 'add') {
            setOpenAdd(true);
        }
    };

    const handleClose = () => {
        setNewSetupName('');
        setSetupId('');
        setOpenUpdate(false);
        setOpenAdd(false);
    };

    const handleAddSetup = () => {
        addSetups({
            document: documentId,
            name: newSetupName
        })
        setOpenAdd(false);
    }

    const handleChangeName = () => {
        updateSetups({ setupId, name: newSetupName })
        setOpenUpdate(false);
    }


    let content = <p>Loading...</p>
    if (isSuccess) {
        content = setupsByDocument.map((setup) => (
            <ListItem
                sx={{ pl: 0 }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <DisplaySettingsIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={setup.name}
                    secondary={setup.default ? 'Default' : ''}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Set Default" placement="left">
                        <IconButton
                            edge="end"
                            aria-label="set default"
                            sx={{ ml: 2 }}
                            disabled={ setup.default ? true : false }
                            onClick={() => updateSetups({ setupId: setup.id, isDefault: true })}
                        >
                            <StarIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        edge="end"
                        aria-label="rename"
                        sx={{ ml: 2 }}
                        onClick={() => handleClickOpen('update', setup.id)}
                    >
                        <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => deleteSetups({ setupId: setup.id })}
                        edge="end"
                        aria-label="delete"
                        sx={{ ml: 2 }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    } else if (isError) {
        content = <p>Error</p>
    }

    return (
        <Box>
            <Grid item>
                <Typography
                    variant="h1"
                    color="primary"
                >
                    Setups Overview
                </Typography>
                <List dense={true}>
                    {content}
                </List>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex' }}>
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ ml: 'auto' }}
                    onClick={() => handleClickOpen('add')}
                >
                    Add Setup
                </Button>
            </Box>
            {/* Update Setup Form */}
            <Dialog open={openUpdate} onClose={handleClose}>
                <DialogTitle>
                    Update Setup
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the current setup.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewSetupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChangeName} variant="contained">Apply</Button>
                </DialogActions>
            </Dialog>
            {/* Add Setup Form */}
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>
                    Add a New Setup
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new Setup for your document.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewSetupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddSetup} variant="contained">Apply</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
  
}

export default SetupsList;