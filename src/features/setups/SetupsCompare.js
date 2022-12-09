import { useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { selectDocumentById } from "../documents/documentSlice";
import { useCompareDocumentSetupsQuery } from '../documents/documentSlice'

import PieChart from "../../common/PieChart"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

import { styled } from '@mui/system';

const MenuButton = styled(Button)({
  color: '#252C32',
  backgroundColor: "#fff",
  border: '1px solid #DDE2E4',
  padding: '4px 12px',
  textTransform: 'none',
  borderRadius: '6px',
})

const SetupTitle = styled(Typography)({
    fontWeight: '600',
    color: '#6E7C87',
    fontSize: '16px',
})

const SetupItem = styled(Card)({
    padding: '16px 0',
    borderRadius: '6px',
    border: '1px solid #E5E9EB',
    backgroundColor: 'transparent',
    boxShadow: 'none'
})

const MenuItemSelected = styled(Typography)({
    fontSize: '0.875rem',
    color: '#0E73F6',
})

const DropdownMenuItem = styled(MenuItem)({
    fontSize: '0.875rem',
    borderRadius: '6px',
    '&:hover': {
        color: '#0E73F6',
        backgroundColor: '#D7EDFF',
    },
})

const SetupsCompare = () => {

    const { documentId } = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const [compareMetric, setCompareMetric] = useState(null);

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChangeMetric = (metric) => {
        setAnchorEl(null);
        setCompareMetric(metric)
    }

    const { data } = useCompareDocumentSetupsQuery({ documentId, metric: compareMetric })

    const document = useSelector((state) => selectDocumentById(state, documentId));

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">
                    {document ? document?.name : 'Loading'}
                </Typography>
                <Box>
                    <MenuButton
                            color='secondary'
                            sx={{ ml: 1 }}
                            onClick={handleClick}
                        >
                            Compare:&nbsp;
                            <MenuItemSelected>
                                { data?.active || 'Loading'}
                            </MenuItemSelected>
                    </MenuButton>
                    <Button
                        color='primary'
                        variant='contained'
                        component={Link}
                        to='/setups'
                        sx={{ ml: 1 }}
                        startIcon={<ViewColumnRoundedIcon />}
                    >
                        Manage
                    </Button>
                    <MenuButton
                        color='secondary'
                        sx={{ ml: 1 }}
                        component={Link}
                        to={`/${documentId}`}
                        startIcon={<TrendingUpRoundedIcon sx={{ color: "#5B6871" }} />}
                    >
                        Charts &amp; Data
                    </MenuButton>
                    
                </Box>
            </Box>

        <Divider sx={{ my: 2 }} />
            {/* the margin top is aesthetic */}
            <Grid container spacing={2} sx={{ mt: 0.5 }} direction="row">
                {/* Missing IDS */}
                {
                    data ? data.data.map((setup) => (
                        <Grid item xs={6} lg={4} xl={3}>
                            <SetupItem>
                                <Box sx={{ display:"flex", alignItems: "center", justifyContent: "space-between", px: '16px' }}>
                                    <SetupTitle>{setup.name}</SetupTitle>
                                    {/* Implement in the future */}
                                    {/* <Button
                                        variant='text'
                                        component={Link}
                                        to={`/${documentId}`}
                                        state={{
                                            setup: setup.id 
                                        }}
                                        endIcon={<TrendingUpRoundedIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            py: 0
                                        }}
                                    >
                                        Go To
                                    </Button> */}
                                </Box>
                                <List sx={{ px: '16px' }}>
                                    {
                                        setup.filters.map((filter) => (
                                            <ListItem sx={{ p: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                                    <FilterAltRoundedIcon fontSize='small' />
                                                </ListItemIcon>
                                                <ListItemText primary={filter} primaryTypographyProps={{fontSize: '14px'}} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                                <Table size="small">
                                    {/* <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            {
                                                setup.stats.headers.map((header) => <TableCell>{header}</TableCell>)
                                            }
                                        </TableRow>
                                    </TableHead> */}
                                    <TableBody
                                        sx={{ borderTop: '1px solid #E5E9EB', borderBottom: '1px solid #E5E9EB' }}
                                    >
                                        {
                                            setup.stats.data.map((row) => (
                                                <TableRow>
                                                    {
                                                        row.map((cell) => (
                                                            <TableCell>{cell}</TableCell>
                                                        ))
                                                    } 
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                <Box sx={{ maxWidth: '50%', mx: 'auto', mt: 2 }}>
                                    <PieChart dataPieChart={setup.breakdown} title={false} />
                                </Box>
                            </SetupItem>
                        </Grid>
                    )) : null
                }
            </Grid>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    data ? data.metrics.map(([metric, name]) =>
                        <DropdownMenuItem onClick={() => handleChangeMetric(metric)}>{name}</DropdownMenuItem>
                    )
                    : null
                }
            </Menu>
        </Box>
    )
}

export default SetupsCompare;