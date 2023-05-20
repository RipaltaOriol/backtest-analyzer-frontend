import parseColumnName from "utils/parseColumns";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";

import { useGetStatisticsQuery } from "../features/statistics/statisticsApiSlice";

const TablePaper = styled(Paper)({
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    boxShadow: "none",
});

const SimpleTable = ({ id }) => {
    let tableRows = [];
    let tableData = [];

    const { data, isSuccess } = useGetStatisticsQuery({ setupId: id });

    if (isSuccess) {
        if (data) {
            tableRows.push(<TableCell>Metric</TableCell>);
            for (const prop in data[0]) {
                if (prop !== "stat") {
                    tableRows.push(
                        <TableCell align="center">
                            {parseColumnName(prop)}
                        </TableCell>
                    );
                }
            }
            tableData = data;
        }
    }

    return (
        <TableContainer component={TablePaper}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ fontSize: "14px" }}>{tableRows}</TableRow>
                </TableHead>
                <TableBody>
                    {/* optimise this loop */}
                    {tableData.map((row, idx) => (
                        <TableRow key={idx} hover>
                            <TableCell>{row.stat}</TableCell>
                            {Object.keys(row).reduce((result, cell, idx) => {
                                if (cell !== "stat") {
                                    result.push(
                                        <TableCell
                                            key={idx}
                                            align="center"
                                            sx={{
                                                color:
                                                    row[cell] < 0
                                                        ? "red"
                                                        : "inherit",
                                            }}
                                        >
                                            {row[cell].toFixed(3)}
                                        </TableCell>
                                    );
                                }
                                return result;
                            }, [])}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SimpleTable;
