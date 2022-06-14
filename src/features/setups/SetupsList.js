import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
    useGetSetupsQuery,
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation,
} from './setupsApiSlice';
import { selectAllSetups } from './setupsApiSlice'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AddIcon from '@mui/icons-material/Add';

const SetupsList = () => {

    const { documentId } = useParams()

    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [newSetupName, setNewSetupName] = useState('');
    const [setupId, setSetupId] = useState('')

    const [addSetups] = useAddSetupsMutation()
    const [updateSetups] = useUpdateSetupsMutation()
    const [deleteSetups] = useDeleteSetupsMutation()

    // const orderedSetups = useSelector(selectAllSetups)

    const handleClickOpen = (formType, id) => {
        setNewSetupName('');
        if (formType == 'update') {
            setSetupId(id);
            setOpenUpdate(true);
        }
        if (formType == 'add') {
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
        addSetups({ documentId, name: newSetupName })
        setOpenAdd(false);
    }

    const handleChangeName = () => {
        updateSetups({ documentId, name: newSetupName, setupId })
        setOpenUpdate(false);
    }

    const {
        data: setups,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSetupsQuery(documentId)


    let content = <p>Loading...</p>
    if (isSuccess) {
        content = setups.map((setup) => (
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
                    secondary={setup.default ? 'Default': ''}
                />
                <ListItemSecondaryAction>
                <IconButton 
                    edge="end"
                    aria-label="rename" 
                    sx={{ ml: 2 }}
                    onClick={() => handleClickOpen('update', setup.id)}
                >
                    <DriveFileRenameOutlineIcon />
                </IconButton>
                <IconButton
                    onClick={() => deleteSetups({ documentId, setupId: setup.id }) }
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