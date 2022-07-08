import tableIcons from '../../assets/IconProvider';
import MissingScreenshot from '../../assets/MissingScreenshot.png';

import { useState } from 'react'
import { useSelector } from "react-redux";

import { selectSetupData } from "./setupSlice";

import Notes from '../../pages/Analysis/Notes'

import Grid from '@mui/material/Grid';
import MaterialTable from "material-table";

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
    },
  }),
)

let SetupView = () => {
  const classes = useStyles();
  const setupData = useSelector(selectSetupData);

  const [selectedRow, setSelectedRow] = useState({ '#': null })
  
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
          <Notes />
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
    </>
  );
};

export default SetupView;
