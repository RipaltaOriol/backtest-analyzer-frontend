import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ selectRow, tableData, tableColumns }) => {
    return (
        <Box
            sx={{
                height: "700px",
                width: "100%",
                "& .datagrid-theme-header": {
                    backgroundColor: "#558745",
                    color: "white",
                },
            }}
        >
            <DataGrid
                rows={tableData}
                columns={tableColumns}
                disableMultipleSelection={true}
                onRowClick={(id) => selectRow(id)}
            />
        </Box>
    );
};

export default DataTable;
