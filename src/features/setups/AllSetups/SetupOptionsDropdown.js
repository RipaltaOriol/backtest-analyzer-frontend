import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import { styled } from '@mui/system';

const DocumentMenuItem = styled(MenuItem)({
    borderRadius: '6px',
    '&:hover': {
        color: '#0E73F6',
        backgroundColor: '#D7EDFF',
    }
})

const SetupOptionsDropdown = ({
    open,
    anchorEl,
    handleClose,
    handleRenameClose,
    handleDelete,
}) => {
    return (
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
            <DocumentMenuItem onClick={handleDelete}>
                <ListItemIcon sx={{ minWidth: '30px !important' }} >
                    <DeleteRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </DocumentMenuItem>
        </Menu>
    )
}

export default SetupOptionsDropdown;