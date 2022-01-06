import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FileUpload from './../components/FileUpload'
import FileList from './../components/FileList'
import DataTable from './../components/DataTable'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const API = process.env.REACT_APP_API;

const Management = () => {

  let history = useHistory()
  const { token } = useSelector(state => state.auth)
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [fileData, setFileData] = useState(null)
  
  // FIX: some warning coming from here
  const changeFile = (id, name) => {
    setFile({ id, name })
  }

  const getDocuments = () => {
    axios.get(API + '/documents', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      setFiles(response.data.documents)

    })
    .catch((err) => {
      setFiles([])
    })
  }

  const getBacktestData = () => {
    if (file === null) return 0
    axios.get(API + '/documents/' + file.id, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      const table = JSON.parse(response.data.table)
      setFileData(table)
    })
    .catch((err) => {
      setFileData(null)
    })
  }

  useEffect(() => {
    if (!token) history.push('/login')
    getDocuments()
    getBacktestData()
  }, [file])

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        align="left"
      >
        Backtest Management
      </Typography>
      <FileUpload updateDocuments={getDocuments} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <FileList heading='File List' files={files} changeFile={changeFile} />
        </Grid>
        <Grid item xs={9}>
          <DataTable data={fileData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Management;