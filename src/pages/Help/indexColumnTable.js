import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";

function createData(column, type, notation, example) {
    return { column, type, notation, example };
}

const rows = [
    createData("Trade Number", "Number", "#", "#"),
    createData("Pair", "Text", "col_p", "col_p"),
    createData("Open Price", "Number", "col_o", "col_o"),
    createData("Close Price", "Number", "col_c", "col_c"),
    createData("Risk Reward Ratio", "Number", "col_rr", "col_rr"),
    createData("Stop Loss", "Number", "col_sl", "col_sl"),
    createData("Take Profit", "Number", "col_tp", "col_tp"),
    createData("Metric", "Custom *", "col_m_{...}", "col_m_Above 21 EMA"),
    createData("Date", "Date", "col_d_{...}", "col_d_Open Date"),
    createData("RR Result", "Number", "col_r_{...}", "col_r_Result at 1.6"),
    createData(
        "Percent Result",
        "Number",
        "col_p_{...}",
        "col_p_Result at 1.6"
    ),
    createData("Value Result", "Number", "col_v_{...}", "col_v_Result at 1.6"),
    createData("Notes", "Test", "note", "note"),
    createData("Images", "URL", "imgs", "imgs"),
];

const TablePaper = styled(Paper)({
    boxShadow: "none",
    borderRadius: "6px",
    border: "1px solid #E5E9EB",
    margin: "8px 0px",
});

export default function indexColumnTable() {
    return (
        <TableContainer component={TablePaper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Column / Category Type</TableCell>
                        <TableCell align="right">Value Type</TableCell>
                        <TableCell align="right">Notation</TableCell>
                        <TableCell align="right">Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.column}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.column}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.notation}</TableCell>
                            <TableCell align="right">{row.example}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
