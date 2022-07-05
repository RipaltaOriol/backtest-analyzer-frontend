import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectSetupId } from '../features/setups/setupSlice';
import { useGetStatisticsQuery } from '../features/statistics/statisticsApiSlice';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

const SimpleTable = () => {

    let tableRows = []
    let tableData = []

    const { documentId } = useParams()

    const setupId = useSelector(selectSetupId)

    const { data, isSuccess } = useGetStatisticsQuery({ documentId, setupId })

    if (isSuccess) {
        if (data) {
            tableRows.push(
                <TableCell>Name</TableCell>
            )
            for (const prop in data[0]) {
                if (prop !== 'name') {
                    tableRows.push(
                        <TableCell align="right">{prop}</TableCell>
                    )
                }
            }
            tableData = data
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {tableRows}
                </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, idx) => (
                       <TableRow
                            key={idx}
                        >
                            <TableCell>{row.name}</TableCell>
                            {Object.keys(row).reduce((result, cell, idx) => {
                                if (cell !== 'name') {
                                    result.push(<TableCell key={idx} align="right">{row[cell]}</TableCell>)
                                }
                                return result
                            }, [])}
                        </TableRow>
                    
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SimpleTable;