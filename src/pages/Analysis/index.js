import useLabs from "../../hooks/useLabs";
import useLab from "../../hooks/useLab";
import useLabFeatures from "../../hooks/useLabFeatures";
import "./Analysis.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDocuments from "../../hooks/useDocuments";

import Filter from "./Filter";
import FileList from "../../components/FileList";
import CreateLab from "./CreateLab";
import FilterList from "./FilterList";
import Screenshot from "./Screenshot";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import SimpleTable from "./SimpleTable";
import RichDataTable from "../../components/DataTable";
import Notes from "./Notes";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import FlakyIcon from "@mui/icons-material/Flaky";
import TimelineIcon from "@mui/icons-material/Timeline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MissingScreenshot from "../../assets/MissingScreenshot.png";

import { useSelector, useDispatch } from "react-redux";
import { setSetup } from "../../features/setups/setupSlice";
import { useGetSetupsQuery } from "../../features/setups/setupsApiSlice";
import { selectDocumentById } from "../../features/documents/documentsApiSlice";
import SetupView from "../../features/setups/SetupView";
import SetupDropdown from "../../features/setups/SetupDropdown";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Analysis = () => {
  const fileName = "Test Upload 1";
  const { documentId } = useParams();
  const dispatch = useDispatch();
  // const { labs } = useLabs()
  // const { lab, labStats, labRow, labNote, labFilters,labData, labColumns, setLab, setLabRow, setLabNote, applyFilter } = useLab()
  // const { activeFilter, activeScreenshot, activeNote, filters, setActiveFilter, setActiveScreenshot, setActiveNote } = useLabFeatures(lab)

  const [open, setOpen] = useState(false);
  const { documents } = useDocuments();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const {
  //   data: setups,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetSetupsQuery(documentId)

  // const singleDocument = useSelector(selectDocumentById)
  const doc = useSelector((state) => selectDocumentById(state, documentId));

  console.log("doc is : ", doc);
  // const orderedSetups = useSelector(selectAllSetups)
  const [age, setAge] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeO1 = (event) => {
    setOption1(event.target.value);
  };

  const handleChangeO2 = (event) => {
    setOption2(event.target.value);
  };

  let documentName = "Loading";
  if (doc) {
    documentName = doc.name;
  }

  // let setupsDefaultId = 0;
  // let setupsDefaultName = '';
  // let setupsMenu;
  // if (isSuccess) {
  //   dispatch(setSetup({ setup: 'Updated One' }))
  //   const setupsDefault = setups.find(setup => setup.default);
  //   setupsDefaultId = setupsDefault.id;
  //   setupsDefaultName = setupsDefault.name;
  //   setupsMenu = setups.map(setup => {
  //     if (!setup?.default) {
  //       return <MenuItem value={setup.id}>{setup.name}</MenuItem>
  //     }
  //   })
  // }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h1" color="primary" sx={{ mr: 2 }}>
          {documentName}
        </Typography>
        <SetupDropdown />
        <Button
          sx={{ ml: "auto" }}
          variant="contained"
          color="secondary"
          href={"/" + documentId + "/setups"}
        >
          Manage Setups
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup variant="contained" sx={{ my: 1 }}>
          <Button onClick={handleClickOpen}>Filter</Button>
          <Button>Export Imgs</Button>
          <Button>Export All</Button>
        </ButtonGroup>
        <Button sx={{ ml: "auto" }} variant="contained" color="secondary">
          Charts & Data
        </Button>
      </Box>
      <Divider />
      <ButtonGroup variant="contained" sx={{ my: 1 }}>
        <Button disabled>Toggle Tables</Button>
        <Button>Toggle Notes</Button>
        <Button>Toggle Images</Button>
      </ButtonGroup>
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}

            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option1}
                label="Age"
                MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                onChange={handleChangeO1}
              >
                {false && <MenuItem value={10}>Ten</MenuItem>}
                {false && <MenuItem value={20}>Twenty</MenuItem>}
                {false && <MenuItem value={30}>Thirty</MenuItem>}
                {true && <MenuItem value={10}>One</MenuItem>}
                {true && <MenuItem value={20}>Two</MenuItem>}
                {true && <MenuItem value={30}>Three</MenuItem>}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box>
        <SetupView />
      </Box>
      {/* <Box sx={{ my: 2, height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableMultipleSelection={true}
        />
        
      </Box> */}

      {/* <Box>
        <img
          src={MissingScreenshot}
          loading="lazy"
        />
        <TextField
          label="Notes"
          fullWidth
          multiline
          minRows={2}
          sx={{ mt: 2 }}
        />
      </Box> */}
      {/* {!lab && (
        <>
          <FileList
            heading='Lab List'
            files={labs}
            changeFile={setLab}
          />
          <CreateLab changeFile={changeFile} />
        </>
      )} */}
      {/* {lab && (
        <Box>
          <Box 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant='h5'
            >
              {lab.name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => { setLab(null) }}
            >
              Clear
            </Button>
          </Box>
            <ButtonGroup variant="outlined">
            <Button
              variant='contained'
              onClick={() => setActiveFilter(!activeFilter)}
              endIcon={<FilterAltOutlinedIcon />}
            >
              Filter
            </Button>
            <Button
              variant='contained'
              onClick={() => setActiveScreenshot(!activeScreenshot)}
              endIcon={<PhotoCameraIcon />}
            >
              Screenshots
            </Button>
            <Button
              variant='contained'
              onClick={() => setActiveNote(!activeNote)}
              endIcon={<StickyNote2Icon />}
            >
              Notes
            </Button>
            <Button
              variant='contained'
              endIcon={<FlakyIcon />}
              disabled
            >
              Compare
            </Button>
            <Button
              variant='contained'
              endIcon={<TimelineIcon />}
              disabled
            >
              Chart
            </Button>
            <Button
              variant='contained'
              endIcon={<PictureAsPdfIcon />}
              disabled
            >
              PDF
            </Button>
          </ButtonGroup>
          <FilterList
            filters={labFilters}
            removeFilter={applyFilter}
          />
          {activeFilter && (
            <Filter
              applyFilter={applyFilter}
              filterList={filters}
              cancel={setActiveFilter}
            />
          )}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <SimpleTable data={labStats} />
            </Grid>
            <Grid item xs={8}>
              <RichDataTable
                selectRow={setLabRow}
                tableData={labData}
                tableColumns={labColumns}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              {activeNote && <Notes
                labId={lab !== null ? lab.id : null }
                note={labNote}
                changeNote={setLabNote}
                />
              }
            </Grid>
            <Grid item xs={6}>
              {activeScreenshot && <Screenshot ss={labRow.row ? labRow.row['Screenshot'] : ''}/>}
            </Grid>
          </Grid>
        </Box>
      )} */}
    </Box>
  );
};

export default Analysis;
