import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#558745",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const DataTable = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {data &&
                            data.columns.map((column, i) => (
                                <StyledTableCell key={i}>
                                    {column}
                                </StyledTableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.data.map((row, i) => {
                            return (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    {row.map((column, y) => {
                                        return (
                                            <>
                                                <TableCell
                                                    key={y}
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {column}
                                                </TableCell>
                                            </>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
