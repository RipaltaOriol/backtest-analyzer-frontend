import { useGetStatisticsQuery } from '../features/statistics/statisticsApiSlice';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { styled } from '@mui/system';

const TablePaper = styled(Paper)({
    border: '1px solid #E5E9EB',
    borderRadius: '6px',
    boxShadow: 'none',
  })

const SimpleTable = ({ id }) => {

    let tableRows = []
    let tableData = []

    const { data, isSuccess } = useGetStatisticsQuery({ setupId: id })

    if (isSuccess) {
        if (data) {
            tableRows.push(
                <TableCell>Metric</TableCell>
            )
            for (const prop in data[0]) {
                if (prop !== 'stat') {
                    tableRows.push(
                        <TableCell align="center">{prop}</TableCell>
                    )
                }
            }
            tableData = data
        }
        
    }

    

    return (
        <TableContainer component={TablePaper}>
            <Table
                size="small"
            >
                <TableHead>
                <TableRow sx={{ fontSize: '14px' }}>
                    {tableRows}
                </TableRow>
                </TableHead>
                <TableBody>
               
                    {tableData.map((row, idx) => (
                       <TableRow
                            key={idx}
                            hover
                        >
                            <TableCell>{row.stat}</TableCell>
                            {Object.keys(row).reduce((result, cell, idx) => {
                                if (cell !== 'stat') {
                                    result.push(<TableCell key={idx} align="center">{row[cell].toFixed(3)}</TableCell>)
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