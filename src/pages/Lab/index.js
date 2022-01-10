import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Filter from './Filter'
import FileList from '../../components/FileList'
import CreateLab from './CreateLab'
import FilterList from './FilterList'
import Screenshot from './Screenshot'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import SimpleTable from './SimpleTable'
import RichDataTable from '../../components/DataTable'
import Notes from './Notes'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import TimelineIcon from '@mui/icons-material/Timeline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const API = process.env.REACT_APP_API;

const Lab = () => {

  const history = useHistory()
  const { token } = useSelector(state => state.auth)
  const [file, setFile] = useState(null)
  const [labData, setLabData] = useState([])
  const [labColumns, setLabColumns] = useState([])
  const [overviewStats, setOverviewStats] = useState(null)

  const [labs, setLabs] = useState([])

  const [filters, setFilters] = useState([])
  const [filterOptions, setFilterOptions] = useState([])
  const [activeFilter, setActiveFilter] = useState(false)
  const [activeScreenshot, setActiveScreenshot] = useState(false)
  const [activeNotes, setActiveNotes] = useState(false)
  const [currentRow, setCurrentRow] = useState({})
  const [note, setNote] = useState('')

  const handleRowChange = (row) => {
    setCurrentRow(row)
  }

  const handleNoteChange = (note) => {
    setNote(note)
  }

  const getLab = () => {
    if (file === null) return 0
    axios.get(API + '/labs/' + file.id, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      const labFilters = response.data.filters
      const stats = JSON.parse(response.data.stats)
      const rawRows = JSON.parse(response.data.table)
      const columns = response.data.columns.map((col) => {
        return { field: col, minWidth: 100, headerClassName: 'datagrid-theme-header', flex: 1}
      })
      const rows = rawRows.map((row, idx) => {
        return { id: idx, ...row}
      })
      setLabData(rows)
      setLabColumns(columns)
      setFilters(labFilters)
      setOverviewStats(stats)
      setNote(response.data.notes)
    })
    .catch((err) => {
      setLabData([])
    })
  }

  const getFilterOptions = () => {
    console.log('This is not even triggering')
    console.log(file)
    if (file === null) return 0
    axios.get(API + '/labs/' + file.id + '/filter', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      console.log('Rendering filters')
      console.log(file.id)
      console.log(response.data)
      setFilterOptions(response.data.columns)
    })
    .catch((err) => {
      console.log(err)
      console.log('Make sure this is throwing an error')
      setFilterOptions(null)
    })
  }
  
  const changeFile = (id, name) => {
    setFile({ id, name })
  }

  const removeFilter = (getFilter) => {
    axios.put(API + '/labs/' + file.id + '/filter', getFilter, {
      headers: { 'Authorization': 'Bearer ' + token },
      params: { method: 'delete' }
    })
    .then((response) => {
      const labFilters = response.data.filters
      const stats = JSON.parse(response.data.stats)
      const rawRows = JSON.parse(response.data.table)
      const columns = response.data.columns.map((col) => {
        return { field: col, minWidth: 100, headerClassName: 'datagrid-theme-header', flex: 1}
      })
      const rows = rawRows.map((row, idx) => {
        return { id: idx, ...row}
      })
      setLabData(rows)
      setLabColumns(columns)
      setFilters(labFilters)
      setOverviewStats(stats)
    })
    .catch((err) => {
      setLabData([])
    })
  }

  const applyFilter = (filter, action, value) => {
    if (filter !== undefined) {
      const filterObject = {
        filter: filter.id,
        action,
        value
      }
      axios.put(API + '/labs/' + file.id + '/filter', filterObject, {
        headers: { 'Authorization': 'Bearer ' + token },
        params: { method: 'add' }
      })
      .then((response) => {
        const labFilters = response.data.filters
        const stats = JSON.parse(response.data.stats)
        const rawRows = JSON.parse(response.data.table)
        const columns = response.data.columns.map((col) => {
          return { field: col, minWidth: 100, headerClassName: 'datagrid-theme-header', flex: 1}
        })
        const rows = rawRows.map((row, idx) => {
          return { id: idx, ...row}
        })
        setLabData(rows)
        setLabColumns(columns)
        setFilters(labFilters)
        setOverviewStats(stats)
      })
      .catch((err) => {
        setLabData([])
      })
    }
    setActiveFilter(false)
  }

  const getFiles = () => {
    axios.get(API + '/labs', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then((response) => {
      setLabs(response.data.labs)
    })
    .catch((err) => {
      setLabs([])
    })
  }

  useEffect(() => {
    if (!token) history.push('/login')
    getFiles()
    getLab()
    getFilterOptions()
  }, [file])

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        align="left"
      >
        Lab Area
      </Typography>

      { !file && (
        <>
          <FileList
            heading='Lab List'
            files={labs}
            changeFile={changeFile}
          />
          <CreateLab changeFile={changeFile} />
        </>
      ) }
      { file && (
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
              {file.name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => { setFile(null) }}
            >
              Clear
            </Button>
          </Box>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant='contained'
              onClick={() => setActiveFilter(true)}
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
              onClick={() => setActiveNotes(!activeNotes)}
              endIcon={<StickyNote2Icon />}
            >
              Notes
            </Button>
            <Button
              variant='contained'
              endIcon={<GroupWorkIcon />}
              disabled
            >
              Group
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
            filters={filters}
            removeFilter={removeFilter}
          />
          {activeFilter && (
            <Filter
              applyFilter={applyFilter}
              filterList= {filterOptions}
            />
          )}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <SimpleTable data={overviewStats} />
            </Grid>
            <Grid item xs={8}>
              <RichDataTable
                selectRow={handleRowChange}
                tableData={labData}
                tableColumns={labColumns}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              {activeNotes && <Notes
                labId={file !== null ? file.id : null }
                note={note}
                changeNote={handleNoteChange}
                />
              }
            </Grid>
            <Grid item xs={6}>
              {activeScreenshot && <Screenshot ss={currentRow.row ? currentRow.row['Screenshot'] : ''}/>}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default Lab;