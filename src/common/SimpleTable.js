import { parseStatsValues } from "utils/displayUtils";
import parseColumnName from "utils/parseColumns";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";

// eslint-disable-next-line no-unused-vars
const STATS_METRICS = [
    ["Total Trades", "count"],
    ["Net Return", "total"],
    ["Avg. Trade", "mean"],
    ["Avg. Win", "avg_win"],
    ["Avg. Loss", "avg_loss"],
    ["Drawdown", "drawdown"],
    ["Win Rate", "win_rate"],
    ["Expectancy", "expectancy"],
    ["Profit Factor", "profit_factor"],
    ["Max Win", "max_win"],
    ["Max Consec. Losses", "max_consec_loss"],
    ["Wins", "wins"],
    ["Losses", "losses"],
    ["Break Evens", "breakEvens"],
];

const TablePaper = styled(Paper)({
    boxShadow: "none",
});

const HeaderCell = styled(TableCell)({
    borderLeft: "1px solid rgb(224, 224, 224)",
    "&:first-of-type": {
        border: "none",
    },
});

const RowCell = styled(TableCell)({
    borderLeft: "1px solid rgb(224, 224, 224)",
    "&:first-of-type": {
        border: "none",
    },
});

const MetricRow = styled(TableRow)({
    "&:last-of-type ": {
        border: "none",
    },
});

const SimpleTable = ({ statsData }) => {
    return (
        <TableContainer component={TablePaper}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ fontSize: "14px" }}>
                        <HeaderCell>Metric</HeaderCell>
                        {Object.keys(statsData?.data).map((col, idx) => (
                            <HeaderCell align="center" key={idx}>
                                {parseColumnName(col)}
                            </HeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* optimise this loop */}
                    {STATS_METRICS.map(([name, prop]) => (
                        <MetricRow
                            key={prop}
                            hover
                            sx={{
                                "&.MuiTableRow-hover:hover": {
                                    backgroundColor: "rgb(229, 246, 253)",
                                },
                            }}
                        >
                            <RowCell>{name}</RowCell>
                            {Object.keys(statsData?.data).map((col, i) => (
                                <RowCell
                                    key={i}
                                    align="center"
                                    sx={{
                                        color:
                                            statsData?.data[col][prop] < 0
                                                ? "red"
                                                : "inherit",
                                    }}
                                >
                                    {parseStatsValues(
                                        col,
                                        prop,
                                        statsData?.data[col][prop]
                                    )}
                                </RowCell>
                            ))}
                        </MetricRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SimpleTable;
