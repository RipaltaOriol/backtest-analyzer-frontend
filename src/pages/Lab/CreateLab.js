import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const API = process.env.REACT_APP_API;

const CreateLab = ({ changeFile }) => {

  const { token } = useSelector(state => state.auth)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [documents, setDocuments] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post(API + '/labs', { name, file },
    {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      console.log(response.data)
      const id = response.data._id['$oid']
      const name = response.data.name
      changeFile(id, name)

    })
    .catch((err) => {
      console.log(err)
    })

  }

  const handleChange = (e) => {
    
    setFile(e.target.value);
  }

  useEffect(() => {
    axios.get(API + '/documents', {
      headers: { 'Authorization': 'Bearer ' + token}
    })
    .then((response) => {
      setDocuments(response.data.documents)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <form 
      noValidate
      style={{ display: 'flex', margin: '20px auto'}}
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        sx={{ mr: 2 }}
        label="Lab Name"
        variant="standard"
        color="primary"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormControl sx={{ mr: 2, minWidth: 120 }} variant='standard'>
        <InputLabel id="demo-simple-select-label">Document</InputLabel>
        <Select
          autoWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={file}
          label="Document"
          onChange={handleChange}
        >
          { documents && documents.map(document => (
            <MenuItem key={documents.id} value={document.id}>{document.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{ height: 40 }}
        style={{ alignSelf: 'flex-end' }}
        type="submit"
        variant="contained"
        size='medium'
      >
        Create
      </Button>
    </form>
  )
}

export default CreateLab