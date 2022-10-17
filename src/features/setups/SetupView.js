import tableIcons from '../../assets/utils/IconProvider';
import MissingScreenshot from '../../assets/MissingScreenshot.png';

import { useState, useEffect } from 'react'

import Notes from '../../pages/Analysis/Notes'
import FilterList from "../../pages/Analysis/FilterList";
import FilterOptions from "../../pages/Analysis/FilterOptions";

import { useDownloadPDFFileMutation } from '../../features/pdfs/pdfsSlice';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InfoIcon from '@mui/icons-material/Info';
import ButtonGroup from "@mui/material/ButtonGroup";
import { createStyles, makeStyles } from '@mui/styles'


import { useGetChartsQuery } from "../statistics/statisticsApiSlice"

import PieChart from "../../common/PieChart";
import LineChart from '../../common/LineChart';
import SimpleTable from '../../common/SimpleTable';

import ScatterGraph from '../graphs/ScatterGraph';
import BarGraph from '../graphs/BarGraph';


let dataLineChart = {}

let dataPieChart = {}


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

const options = {year: 'numeric', month: 'numeric', day: 'numeric' };

let SetupView = ({ setup }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(true)
  const [isImageOpen, setIsImageOpen] = useState(true)
  const [isTableOpen, setIsTableOpen] = useState(true)
  const [selectedRow, setSelectedRow] = useState({})
  
  const [downloadPDFFile] = useDownloadPDFFileMutation()

  const { data, isSuccess, isError } = useGetChartsQuery({ setupId: setup?.id });

  if (isSuccess) {
    if (data) {
      dataLineChart = data.line
      dataPieChart = data.pie
    }
  }

  let dataColumns = [];
  let dataContents = [];

  useEffect(() => {
    setSelectedRow({})
  }, [setup?.id])

  // NOTE: where to put them
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // move this other side
  if (setup && setup.state && Object.keys(setup.state).length !== 0) {
    setup.state.schema.fields.forEach((column) => {
      let header = column.name;
      let hidden = false;

      if (column.name === 'index') {
        header = 'Index'
        hidden = true
      } else if (column.name.startsWith('.r_') || column.name.startsWith('.m_')) {
        header = column.name.substring(3)
      } else if (column.name === '.p') {
        header = 'Pair'
      } else if (column.name === '.s') {
        header = 'Screenshot'
      } else if (column.name === '.d') {
        header = 'Date'
      }

      dataColumns.push({
        title: header,
        field: column.name,
        hidden
      })
    })
    setup.state.data.forEach((row, idx) => {
      // TODO: index should not be added manually
      let {index, ...deepRow} = row
      deepRow.index = idx
      // maybe this could be done in the backend
      deepRow['.d'] = new Date(deepRow['.d']).toLocaleDateString('en-EN', options)
      dataContents.push(deepRow)
    })
  }

  return (
    <Box>
      {/* <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup variant="contained">
          <Button onClick={() => setIsTableOpen(!isTableOpen)}>Toggle Tables</Button>
          <Button onClick={() => setIsNotesOpen(!isNotesOpen)}>Toggle Notes</Button>
          <Button onClick={() => setIsImageOpen(!isImageOpen)}>Toggle Images</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained">
          <Button onClick={handleClickOpen}>Filter</Button>
          <Tooltip
            title="If your table has a lot of columns the PDF might fail to capture them properly"
            placement="bottom-end"
            arrow
          >
            <Button
              endIcon={<InfoIcon />}
              onClick={() => downloadPDFFile({setupId: setup?.id, name: setup?.name})}
            >
              Export</Button>
          </Tooltip>
        </ButtonGroup>
      </Box> */}
      <FilterOptions open={open} handleClose={handleClose} setupId={setup?.id} options={setup?.options} />
      <FilterList setupId={setup?.id} filters={setup?.filters} />
      {/* <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <Notes setupId={setup?.id} notes={setup?.notes} isOpened={isNotesOpen} />
        </Grid>
        <Grid item xs={7}>
          { isImageOpen && (
            <img
              className={classes.contianedImage}
              src={selectedRow['.s'] || MissingScreenshot}
              alt="Trade screenshot"
            />
          )}
        </Grid>
      </Grid> */}
       <Grid container spacing={2}>
          <Grid item xs={8}>
              <LineChart dataLineChart={dataLineChart} />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: '1px solid #E5E9EB', borderRadius: '6px', p: 2 }}>
              <PieChart dataPieChart={dataPieChart} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            {setup?.id && <BarGraph setupId={setup?.id} />}
          </Grid>
          <Grid item xs={6}>
            {setup?.id && <ScatterGraph setupId={setup?.id} />}
          </Grid>
          <Grid item xs={6}>
              <SimpleTable id={setup?.id} />
          </Grid>
          <Grid item xs={6}>
            <Notes setupId={setup?.id} notes={setup?.notes} isOpened={isNotesOpen} />
          </Grid>
          <Grid item xs={12} sx={{ width: '1200px'}}>
            <MaterialTable
              title={<Typography>Data</Typography>}
              columns={dataColumns}
              data={dataContents}
              editable={{
                onRowAdd: newData => {
                  console.log(newData)
                }
                  // new Promise((resolve, reject) => {
                  //   setTimeout(() => {
                  //     setData([...data, newData]);
                  //     resolve();
                  //   }, 1000)
                  // })
              }}
              onRowClick={(evt, selectedRow) => {
                setSelectedRow(selectedRow)
              }}
              options={{
                padding: "dense",
                pageSize: 10,
                rowStyle: (rowData) => ({
                  fontSize: 14,
                  backgroundColor:
                    selectedRow?.index === rowData?.index ? "#D7EDFF" : "#fff",
                }),
                headerStyle: {
                  whiteSpace: 'nowrap'
                }
              }}
              icons={tableIcons}
            />
          </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
          <Grid item xs={6}>
              <LineChart dataLineChart={dataLineChart} />
          </Grid>
          <Grid item xs={6}>
              <SimpleTable id={setup?.id} />
          </Grid>
      </Grid> */}
      {/* <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2}>
              <PieChart dataPieChart={dataPieChart} />
          </Grid>
          <Grid item xs={6}>
              {setup?.id && <ScatterGraph setupId={setup?.id} />}
          </Grid>
          <Grid item xs={6}>
              {setup?.id && <BarGraph setupId={setup?.id} />}
          </Grid>
        </Grid> */}
      
      {/* { isTableOpen && (
        <MaterialTable
          title='Data'
          columns={dataColumns}
          data={dataContents}
          editable={{
            onRowAdd: newData => {
              console.log(newData)
            }
              // new Promise((resolve, reject) => {
              //   setTimeout(() => {
              //     setData([...data, newData]);
              //     resolve();
              //   }, 1000)
              // })
          }}
          onRowClick={(evt, selectedRow) => {
            setSelectedRow(selectedRow)
          }}
          options={{
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow?.index === rowData?.index ? "#0d6efd" : "#fff",
              color:
                selectedRow?.index === rowData?.index ? "#fff" : "#000",
            }),
            
          }}
          icons={tableIcons}
        />
      )} */}
    </Box>
  );
};

export default SetupView;
