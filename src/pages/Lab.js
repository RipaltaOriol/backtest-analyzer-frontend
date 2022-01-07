import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Filter from '../components/Filter'
import FileList from './../components/FileList'
import CreateLab from '../components/CreateLab'
import FilterList from './../components/FilterList'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DataTable from './../components/DataTable'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const API = process.env.REACT_APP_API;

const Lab = () => {

  const history = useHistory()
  const { token } = useSelector(state => state.auth)
  const [file, setFile] = useState(null)
  const [fileData, setFileData] = useState(null)
  const [overviewStats, setOverviewStats] = useState(null)

  const [labs, setLabs] = useState([])

  const [filters, setFilters] = useState([])
  const [filterOptions, setFilterOptions] = useState([])
  const [activeFilter, setActiveFilter] = useState(false)

  const getLab = () => {
    if (file === null) return 0
    axios.get(API + '/labs/' + file.id, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      const labFilters = response.data.filters
      const table = JSON.parse(response.data.table)
      const stats = JSON.parse(response.data.stats)
      setFilters(labFilters)
      setFileData(table)
      setOverviewStats(stats)
    })
    .catch((err) => {
      setFileData(null)
    })
  }

  const getFilterOptions = () => {
    if (file === null) return 0
    axios.get(API + '/labs/' + file.id + '/filter', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      setFilterOptions(response.data.columns)
    })
    .catch((err) => {
      console.log(err)
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
      const table = JSON.parse(response.data.table)
      const stats = JSON.parse(response.data.stats)
      setFilters(labFilters)
      setFileData(table)
      setOverviewStats(stats)
    })
    .catch((err) => {
      setFileData(null)
    })
  }

  const applyFilter = (filter, action, value) => {
    if (filter !== undefined) {
      const filterObject = {
        filter: filter.id,
        action,
        value
      }
      console.log(filterObject)
      axios.put(API + '/labs/' + file.id + '/filter', filterObject, {
        headers: { 'Authorization': 'Bearer ' + token },
        params: { method: 'add' }
      })
      .then((response) => {
        const labFilters = response.data.filters
        const table = JSON.parse(response.data.table)
        const stats = JSON.parse(response.data.stats)
        setFilters(labFilters)
        setFileData(table)
        setOverviewStats(stats)
      })
      .catch((err) => {
        console.log(err)
        setFileData(null)
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
    <Container>
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
              variant="outlined"
              color="error"
              onClick={() => { setFile(null) }}
            >
              Clear
            </Button>
          </Box>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              onClick={() => setActiveFilter(true)}
              endIcon={<FilterAltOutlinedIcon />}
            >
              Filter
            </Button>
            <Button>TBD</Button>
            <Button>TBD</Button>
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
              <DataTable data={overviewStats} />
            </Grid>
            <Grid item xs={8}>
              <DataTable data={fileData} />
            </Grid>
          </Grid>

        </Box>
      ) }

    </Container>
  )
}

export default Lab;