import { useState, useEffect } from 'react';

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { styled } from '@mui/system';

const MenuButton = styled(Button)({
  color: '#252C32',
  backgroundColor: "#fff",
  border: '1px solid #DDE2E4',
  padding: '4px 12px',
  textTransform: 'none',
  borderRadius: '6px',
})

const FilterMenuItem = styled(MenuItem)({
    fontSize: '14px',
    borderRadius: '6px',
    '&:hover': {
        color: '#0E73F6',
        backgroundColor: '#D7EDFF',
    },
    '.Mui-selected': {
        backgroundColor: 'red'
    }
})

let SetupFilter = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//   const [selectedSetup, setSelectedSetup] = useState(defaultSetup?.name || '');

//   useEffect(() => {
//     if (defaultSetup) {
//       setSelectedSetup(defaultSetup?.name);
//       changeSetup(defaultSetup)
//     }
//   }, [defaultSetup])

//   const handleChangeSetup = (id) => {
//     const changedSetup = setups.find(setup => setup.id === id)
//     setSelectedSetup(changedSetup?.name)
//     changeSetup(changedSetup)
//   }
   
  return (
    <>
        <MenuButton
            color='secondary'
            sx={{ ml: 1 }}
            onClick={handleClick}
            startIcon={<FilterAltRoundedIcon sx={{ color: "#5B6871" }} />}
        >
            Filter
        </MenuButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            autoFocus={false}
            sx={{ mt: 1 }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{ p: '24px' }}>
                <Typography variant="subtitle2">Setup Filters</Typography>
                <Typography sx={{ fontSize: '14px' }} gutterBottom>Select from the dropdown to apply filters to your setups</Typography>
                <Select
                    size="small"
                    value={age}
                    renderValue={value => (
                        <>
                            <Typography display='inline-block' sx={{ minWidth: 80, color: "#9AA6AC", fontSize: '14px' }}>Column</Typography>
                            <Typography display='inline' sx={{ fontSize: '14px' }}>{value}</Typography>
                        </>
                    )}
                    onChange={handleChange}
                    label={null}
                    MenuListProps={{ select: { '&:focus': { borderColor: 'red'}}}}
                    sx={{
                        my: 1, '& legend': { display: 'none' }, '& fieldset': { top: 0 }, width: '100%',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'inherit',
                            borderWidth: '1px'
                        },
                    }}
                    InputLabelProps={{shrink: false}}
                    IconComponent={(props) => (<KeyboardArrowDownRoundedIcon {...props} />)}
                >
                    <FilterMenuItem value={10}>Ten</FilterMenuItem>
                    <FilterMenuItem value={20}>Twenty</FilterMenuItem>
                    <FilterMenuItem value={30}>Thirty</FilterMenuItem>
                </Select>
                <Select
                    size="small"
                    value={age}
                    renderValue={value => (
                        <>
                            <Typography display='inline-block' sx={{ minWidth: 80, color: "#9AA6AC", fontSize: '14px' }}>Column</Typography>
                            <Typography display='inline' sx={{ fontSize: '14px' }}>{value}</Typography>
                        </>
                    )}
                    onChange={handleChange}
                    label={null}
                    MenuListProps={{ select: { '&:focus': { borderColor: 'red'}}}}
                    sx={{
                        my: 1, '& legend': { display: 'none' }, '& fieldset': { top: 0 }, width: '100%',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'inherit',
                            borderWidth: '1px'
                        },
                    }}
                    InputLabelProps={{shrink: false}}
                    IconComponent={(props) => (<KeyboardArrowDownRoundedIcon {...props} />)}
                >
                    <FilterMenuItem value={10}>Ten</FilterMenuItem>
                    <FilterMenuItem value={20}>Twenty</FilterMenuItem>
                    <FilterMenuItem value={30}>Thirty</FilterMenuItem>
                </Select>
                <Select
                    size="small"
                    value={age}
                    renderValue={value => (
                        <>
                            <Typography display='inline-block' sx={{ minWidth: 80, color: "#9AA6AC", fontSize: '14px' }}>Column</Typography>
                            <Typography display='inline' sx={{ fontSize: '14px' }}>{value}</Typography>
                        </>
                    )}
                    onChange={handleChange}
                    label={null}
                    MenuListProps={{ select: { '&:focus': { borderColor: 'red'}}}}
                    sx={{
                        my: 1, '& legend': { display: 'none' }, '& fieldset': { top: 0 }, width: '100%',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'inherit',
                            borderWidth: '1px'
                        },
                    }}
                    InputLabelProps={{shrink: false}}
                    IconComponent={(props) => (<KeyboardArrowDownRoundedIcon {...props} />)}
                >
                    <FilterMenuItem value={10}>Ten</FilterMenuItem>
                    <FilterMenuItem value={20}>Twenty</FilterMenuItem>
                    <FilterMenuItem value={30}>Thirty</FilterMenuItem>
                </Select>
                <Box display='flex' justifyContent="center" alignItems="flex-end">
                    <Button variant="text" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained">
                        Apply
                    </Button>
                </Box>
            </Box>
            {/* {setups.map((setup) =>(
            <SetupMenuItem onClick={() => {
                handleClose()
                handleChangeSetup(setup.id)
            }}>{setup.name}</SetupMenuItem>
            ))} */}
            
        </Menu>
    </>
  );
};

export default SetupFilter;
