import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';

import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#263238',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const DataTable = ({data}) => {

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {data && data.columns.map((column, i) => (
              <StyledTableCell key={i}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.data.map((row, i) => {
            return (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {
                  row.map((column, y) => {
                    return (
                      <>
                      <TableCell key={y} component="th" scope="row">
                        {column}
                      </TableCell>
                      </>
                    )
                  })
                }
              </TableRow>
            )
          })}
          {/* {data & data.data.map((row, i) => {
            (
              <TableRow
              key='1'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Name</TableCell>
            </TableRow>
            )
          })} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable