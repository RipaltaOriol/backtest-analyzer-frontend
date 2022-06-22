import { useSelector } from "react-redux";
import { selectSetupId, selectSetupName, selectSetupData } from "./setupSlice";
import React from "react";

import MaterialTable from "material-table";
// import { ThemeProvider, createTheme } from "@mui/material";
// import { ThemeProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/core";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// export default createMuiTheme({});
import { createMuiTheme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { left, right } from "@popperjs/core";

const SetupView = () => {
  //   const { isFetching } = useGetSetupsQuery({ documentId });

  // const { isFetching } = useSelector(selectSetupData);

  // const defaultMaterialTheme = createTheme();
  const tableTheme = createMuiTheme({});
  const setupId = useSelector(selectSetupId);
  const setupName = useSelector(selectSetupName);
  const setupData = useSelector(selectSetupData);
  console.log(
    "setupID:",
    setupId,
    "setupName:",
    setupName,
    "setupData:",
    setupData
  );
  //
  var dataResponse = {
    columns: [
      {
        field: "#",
        title: "#",

        headerName: "#",
        width: 90,
      },
      {
        field: ".m_RRR",
        title: ".m_RRR",

        headerName: ".m_RRR",
        width: 90,
      },
      {
        field: ".r_Result",
        title: ".r_Result",

        headerName: ".r_Result",
        width: 90,
      },
      {
        field: ".r_Result 50% Candle SL",
        title: ".r_Result 50% Candle SL",

        headerName: ".r_Result 50% Candle SL",
        width: 90,
      },
      {
        field: ".m_Entry Candle",
        title: ".m_Entry Candle",

        headerName: ".m_Entry Candle",
        width: 90,
      },
      {
        field: ".m_Zone Touch #",
        title: ".m_Zone Touch #",

        headerName: ".m_Zone Touch #",
        width: 90,
      },
      {
        field: ".m_Zone Origin",
        title: ".m_Zone Origin",

        headerName: ".m_Zone Origin",
        width: 90,
      },
      {
        field: ".m_Re-entry @ Other Level",
        title: ".m_Re-entry @ Other Level",

        headerName: ".m_Re-entry @ Other Level",
        width: 90,
      },
      {
        field: ".m_Fast Into Profits",
        title: ".m_Fast Into Profits",

        headerName: ".m_Fast Into Profits",
        width: 90,
      },
      {
        field: ".m_Trade @ Range Over",
        title: ".m_Trade @ Range Over",

        headerName: ".m_Trade @ Range Over",
        width: 90,
      },
      {
        field: ".m_Checked",
        title: ".m_Checked",

        headerName: ".m_Checked",
        width: 90,
      },
      {
        field: ".p",
        title: ".p",

        headerName: ".p",
        width: 90,
      },
    ],
    data: [
      {
        "#": 1,
        ".m_RRR": 0,
        ".r_Result": 0,
        ".r_Result 50% Candle SL": 0,
        ".m_Entry Candle": "0",
        ".m_Zone Touch #": 0,
        ".m_Zone Origin": 0,
        ".m_Re-entry @ Other Level": "No",
        ".m_Fast Into Profits": "No",
        ".m_Trade @ Range Over": "No",
        ".m_Checked": "No",
        ".p": "AUDUSD",
      },
    ],
  };
  if (setupData && Object.keys(setupData).length !== 0) {
    dataResponse = JSON.parse(setupData);

    if (dataResponse) {
      const freeArray = [];
      const { columns, data } = dataResponse;
      for (const iterator of columns) {
        if (iterator == "#") {
          freeArray.push({
            title: iterator,
            field: iterator,
            headerName: iterator,
            width: 90,
          });
        } else {
          freeArray.push({
            title: iterator,
            field: iterator,
            headerName: iterator,
            width: 90,
          });
        }
      }

      const freeDataArray = [];
      for (const dataIteration of data) {
        const totalLength = dataIteration.length;
        const dataObject = {};
        for (let index = 0; index < totalLength; index++) {
          dataObject[columns[index]] = dataIteration[index] || null;
        }
        freeDataArray.push(dataObject);
      }

      dataResponse.columns = freeArray;
      dataResponse.data = freeDataArray;
    }
  }

  return (
    <>
      <h1>{setupName}</h1>
      <h1>{setupId}</h1>

      <ThemeProvider theme={tableTheme}>
        <MaterialTable
          options={{
            showFirstLastPageButtons: false,
            toolbarButtonAlignment: left,
            searchFieldAlignment: right,
          }}
          columns={dataResponse.columns}
          data={dataResponse.data}
          title="Record"
        />
      </ThemeProvider>
      {/* {setupData && setupData.columns ? (
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={setupData.columns}
            data={setupData.data}
            title="Personen"
          />
        </ThemeProvider>
      ) : (
        {}
      )} */}
      {/* <h1>{setupData}</h1> */}
    </>
    // <Box sx={{ my: 2, height: 500, width: '100%' }}>
    //     <DataGrid
    //         rows={rows}
    //         columns={columns}
    //         pageSize={10}
    //         rowsPerPageOptions={[10]}
    //         disableMultipleSelection={true}
    //         // onRowClick={(id) => selectRow(id)}
    //     />
    // </Box>
  );
};

export default SetupView;
