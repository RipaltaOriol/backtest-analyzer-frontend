import tableIcons from '../../assets/IconProvider';
import MissingScreenshot from '../../assets/MissingScreenshot.png';

import { useState } from 'react'
import { useSelector } from "react-redux";

import { selectSetupData } from "./setupSlice";

import Grid from '@mui/material/Grid';
import MaterialTable from "material-table";
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles'



const useStyles = makeStyles((theme) =>
  createStyles({
    contianedImage: {
      width: '100%'
    },
    inputMultiline : {
      height: "100%",
      "& .MuiInputBase-root": {
        height: "100%",
        display: "flex",
        alignItems: "start"
      }
    }
  }),
)

const SetupView = () => {
  const classes = useStyles()
  const setupData = useSelector(selectSetupData);

  const [selectedRow, setSelectedRow] = useState({ '#': null})
  
  let dataColumns = [];
  let dataContents = [];

  // Move this other side
  if (setupData && Object.keys(setupData).length !== 0) {
    setupData.schema.fields.forEach((column) => {
      if (column.name === 'index') return false;

      let header = column.name;
      if (column.name.startsWith('.r_') || column.name.startsWith('.m_')) {
        header = column.name.substring(3)
      } else if (column.name === '.p') {
        header = 'Pair'
      }

      dataColumns.push({
        title: header,
        field: column.name,
      })
    })

    setupData.data.forEach((row) => {
      let {index, ...deepRow} = row
      dataContents.push(deepRow)
    })
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <TextField
            className={classes.inputMultiline}
            label="Notes"
            multiline
            fullWidth
            rows={7}
            variant="filled"
          />
        </Grid>
        <Grid item xs={7}>
          <img
            className={classes.contianedImage}
            src={MissingScreenshot}
            alt="Trade screenshot"
          />
        </Grid>
      </Grid>
      
      <MaterialTable
        title='Data'
        columns={dataColumns}
        data={dataContents}
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow)
        }}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow['#'] === rowData['#'] ? "#0d6efd" : "#fff",
            color:
              selectedRow['#'] === rowData['#'] ? "#fff" : "#000",
          }),
          
        }}
        icons={tableIcons}
      />
        

      
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
