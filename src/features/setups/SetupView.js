import tableIcons from '../../assets/IconProvider';
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
import InfoIcon from '@mui/icons-material/Info';
import ButtonGroup from "@mui/material/ButtonGroup";

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

let SetupView = ({ setup }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(true)
  const [isImageOpen, setIsImageOpen] = useState(true)
  const [isTableOpen, setIsTableOpen] = useState(true)
  const [selectedRow, setSelectedRow] = useState({ '#': null })
  
  const [downloadPDFFile] = useDownloadPDFFileMutation()

  let dataColumns = [];
  let dataContents = [];

  useEffect(() => {
    setSelectedRow({ '#': null })
  }, [setup?.id])

  // NOTE: where to put them
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // move this other side
  if (setup && setup.state && Object.keys(setup.state).length !== 0) {
    setup.state.schema.fields.forEach((column) => {
      if (column.name === 'index') return false;

      let header = column.name;
      if (column.name.startsWith('.r_') || column.name.startsWith('.m_')) {
        header = column.name.substring(3)
      } else if (column.name === '.p') {
        header = 'Pair'
      } else if (column.name === '.s') {
        header = 'Screenshot'
      }

      dataColumns.push({
        title: header,
        field: column.name,
      })
    })
    setup.state.data.forEach((row) => {
        let {index, ...deepRow} = row
        dataContents.push(deepRow)
      })
  }

  return (
    <Box>
      <Box
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
      </Box>
      <FilterOptions open={open} handleClose={handleClose} setupId={setup?.id} options={setup?.options} />
      <FilterList setupId={setup?.id} filters={setup?.filters} />
      <Grid container spacing={2} sx={{ mb: 2 }}>
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
      </Grid>
      
      { isTableOpen && (
        <MaterialTable
          title='Data'
          columns={dataColumns}
          data={dataContents}
          onRowClick={(evt, selectedRow) => {
            console.log(selectedRow)
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
      )}
    </Box>
  );
};

export default SetupView;
