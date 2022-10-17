import { useParams, Link } from "react-router-dom";


import { useSelector } from "react-redux";

import { useGetSetupsQuery } from "./setupsSlice"
import { selectSetupsByDocument } from "./setupsSlice";
import { selectDocumentById } from "../documents/documentsApiSlice";
import { useCompareDocumentSetupsQuery } from '../documents/documentsApiSlice'

import PieChart from "../../common/PieChart"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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
    fontSize: '16px'
})

const SetupItem = styled(Card)({
    padding: '16px 0',
    borderRadius: '6px',
    border: '1px solid #E5E9EB',
    backgroundColor: 'transparent',
    boxShadow: 'none'
})

const dataPieChart = {
    labels: ['Win', 'Break Even', 'Losses'],
    values: [5, 2, 3]
}

const data = [
    {
        title: 'Some Title',
        filters: [
            'Filter 1',
            'RRR bigger than 3',
            'Exit leve include 4 and 5'
        ],
        statas: {
            total: 34,
            winRate: 0.4,
            averageWin: 2.3,
            period: 23,
        },
        graph: {
            dataset: [3, 4, 5, 2, 1]
        }
    },
    {
        title: 'Some Title',
        filters: [
            'Filter 1',
            'RRR bigger than 3',
            'Exit leve include 4 and 5'
        ],
        statas: {
            total: 34,
            winRate: 0.4,
            averageWin: 2.3,
            period: 23,
        },
        graph: {
            dataset: [3, 4, 5, 2, 1]
        }
    },
    {
        title: 'Some Title',
        filters: [
            'Filter 1',
            'RRR bigger than 3',
            'Exit leve include 4 and 5'
        ],
        statas: {
            total: 34,
            winRate: 0.4,
            averageWin: 2.3,
            period: 23,
        },
        graph: {
            dataset: [3, 4, 5, 2, 1]
        }
    },
    {
        title: 'Some Title',
        filters: [
            'Filter 1',
            'RRR bigger than 3',
            'Exit leve include 4 and 5'
        ],
        statas: {
            total: 34,
            winRate: 0.4,
            averageWin: 2.3,
            period: 23,
        },
        graph: {
            dataset: [3, 4, 5, 2, 1]
        }
    },
    {
        title: 'Some Title',
        filters: [
            'Filter 1',
            'RRR bigger than 3',
            'Exit leve include 4 and 5'
        ],
        stats: [
            {
                total: 34,
                winRate: 0.4,
                averageWin: 2.3,
                period: 23,
            }
        ],
        graph: {
            dataset: [3, 4, 5, 2, 1]
        }
    }
]

const SetupsCompare = () => {

    const { documentId } = useParams();

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useCompareDocumentSetupsQuery({ documentId })

    // const {
    //     setupsByDocument,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useCompareDocumentSetupsQuery(documentId, {
    //         selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
    //         setupsByDocument: selectSetupsByDocument(data, documentId),
    //         isLoading,
    //         isError,
    //         isSuccess,
    //     }),
    // })

    // console.log(setupsByDocument)

    const document = useSelector((state) => selectDocumentById(state, documentId));

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">
                    {document ? document?.name : 'Loading'}
                </Typography>
                <Box>
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
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {/* Missing IDS */}
                {
                    data ? data.map((setup) => (
                        <Grid item xs={6} lg={4} xl={3}>
                            <SetupItem>
                                <Box sx={{ display:"flex", alignItems: "center", justifyContent: "space-between", px: '16px' }}>
                                    <SetupTitle>{setup.name}</SetupTitle>
                                    <Button
                                        variant='text'
                                        endIcon={<TrendingUpRoundedIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            py: 0
                                        }}
                                    >
                                        Go To
                                    </Button>
                                </Box>
                                {/* make this into badged */}
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
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            {
                                                setup.stats.headers.map((header) => <TableCell>{header}</TableCell>)
                                            }
                                        </TableRow>
                                    </TableHead>
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
                                    <PieChart dataPieChart={setup.breakdown} />
                                </Box>
                            </SetupItem>
                        </Grid>
                    )) : null
                }
            </Grid>
        </Box>
    )
}

export default SetupsCompare;