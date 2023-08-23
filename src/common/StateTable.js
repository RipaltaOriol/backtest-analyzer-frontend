import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import parseColumnName from "utils/parseColumns";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";

const TablePaginationIcon = styled(IconButton)({
    padding: "1px",
    margin: "5px",
});

const options = { year: "numeric", month: "numeric", day: "numeric" };

let StateTable = ({ setup, setOpen, setSelectedRow }) => {
    const [data, setData] = useState(() => []);
    const [columns, setColumns] = useState(() => []);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState([]);

    const columnHelper = useMemo(() => createColumnHelper(), []);

    const reloadTable = useCallback(() => {
        if (setup && setup.state && Object.keys(setup.state).length !== 0) {
            setColumns(
                Object.keys(setup.state.fields).reduce((result, key) => {
                    if (key !== "imgs" && key !== "note") {
                        if (key.startsWith("col_d_")) {
                            result.push(
                                columnHelper.accessor(key, {
                                    header: parseColumnName(key),
                                    cell: (info) =>
                                        key.startsWith("col_d")
                                            ? new Date(
                                                  info.getValue()
                                              ).toLocaleDateString(
                                                  "en-EN",
                                                  options
                                              )
                                            : info.getValue(),
                                })
                            );
                        } else {
                            result.push(
                                columnHelper.accessor(key, {
                                    header: parseColumnName(key),
                                })
                            );
                        }
                    }
                    return result;
                }, [])
            );
            setData(
                Object.entries(setup?.state.data).map(([key, value]) => {
                    return { ...value, rowId: key };
                })
            );
        }
    }, [setup, columnHelper]);

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            sorting,
        },
        getRowId: (originalRow) => originalRow.rowId,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelectio: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
        reloadTable();
    }, [setup, reloadTable]);

    const openSelectedRow = (row) => {
        if (!row.getIsSelected()) {
            row.toggleSelected();
        }
        setOpen(true);
        setSelectedRow(row.original);
    };

    return (
        <div className="table-container">
            <h3 className="table-title">Data</h3>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: (
                                                        <ArrowUpwardIcon
                                                            fontSize="small"
                                                            sx={{
                                                                ml: 0.5,
                                                                color: "#00000099",
                                                            }}
                                                        />
                                                    ),
                                                    desc: (
                                                        <ArrowDownwardIcon
                                                            fontSize="small"
                                                            sx={{
                                                                ml: 0.5,
                                                                color: "#00000099",
                                                            }}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted()
                                                ] ?? null}
                                            </Box>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={row.getIsSelected() ? "rowSelected" : ""}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    onDoubleClick={() => openSelectedRow(row)}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "5px",
                }}
            >
                <Box
                    sx={{
                        mx: 2,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Rows per page:{" "}
                    <FormControl variant="standard" sx={{ m: 1 }}>
                        <Select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <MenuItem key={pageSize} value={pageSize}>
                                    {pageSize} rows
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mx: 2 }}>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </Box>
                <TablePaginationIcon
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </TablePaginationIcon>
                <TablePaginationIcon
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <KeyboardArrowLeftIcon />
                </TablePaginationIcon>
                <TablePaginationIcon
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <KeyboardArrowRightIcon />
                </TablePaginationIcon>
                <TablePaginationIcon
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <KeyboardDoubleArrowRightIcon />
                </TablePaginationIcon>
            </Box>
            <div className="h-4" />
        </div>
    );
};

export default StateTable;
