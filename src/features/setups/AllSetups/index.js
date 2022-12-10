import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddSetupDialog from 'features/setups/AllSetups/AddSetupDialog';
import RenameSetupDialog from 'features/setups/AllSetups/RenameSetupDialog';
import SetupOptionsDropdown from 'features/setups/AllSetups/SetupOptionsDropdown';

import { useDeleteSetupsMutation } from 'features/setups/setupsSlice';
import { selectAllDocuments } from 'features/documents/documentSlice';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


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

const AllSetups = () => {

    const [openRenameDialog, setOpenRenameDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
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

    const handleRenameClose = () => {
        setAnchorEl(null);
        setOpenRenameDialog(true);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        deleteSetups({ setupId });
    };

    const handleRenameDialogClose = () => {
        setSetupId(null);
        setOpenRenameDialog(false);
    };

    const handleAddDialogClose = () => {
        setOpenAddDialog(false);
    }

    const orderedDocuments = useSelector(selectAllDocuments)

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
                <Button color="primary" variant='contained' onClick={() => setOpenAddDialog(true)}>Add New Setup</Button>
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
            <RenameSetupDialog
                setupId={setupId}
                openRenameDialog={openRenameDialog}
                handleRenameDialogClose={handleRenameDialogClose}
            />
            <AddSetupDialog openAddDialog={openAddDialog} handleAddDialogClose={handleAddDialogClose} />
            <SetupOptionsDropdown
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleRenameClose={handleRenameClose}
                handleDelete={handleDelete}
            />
        </Box>
    )
}

export default AllSetups;