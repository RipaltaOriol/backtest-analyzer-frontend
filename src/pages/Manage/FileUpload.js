import axios from 'axios'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from '../../components/Message'
import Progress from './Progess'
import Button from '@mui/material/Button'

const API = process.env.REACT_APP_API;

const inputStyles = {
  borderColor: '#558745',
  boxShadow: '0 0 0 0.15rem rgb(148 193 134 / 25%)'
}

const FileUpload = ({updateDocuments}) => {

  const { token } = useSelector(state => state.auth)
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [message, setMessage] = useState('')
  const [triggerError, setTriggerError] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const changeMessage = (msg) => {
    setMessage(msg)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (file.type !== 'text/csv') return true
    const data = new FormData();
    const config = {
      headers: { 'Authorization': 'Bearer ' + token },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        )
        // clear percetage
        setTimeout(() => setUploadPercentage(0), 10000)
      }
    }
    data.append('file', file)
    data.append('fileName', fileName)
    axios.post(API + '/documents/upload', data, config)
    .then((response) => {
      setTriggerError(!response.data.success)
      if (response.data.success) {
        setMessage(response.data.msg)
        updateDocuments()
      } else {
        setMessage(response.data.msg)
      }
      
    })
    .catch((err) => {
      setTriggerError(true)
      setMessage('Error')
      
    })
  }

  return (
    <Fragment>
      {message ? <Message message={message} isError={triggerError} setMessage={changeMessage} /> : null}
      <form onSubmit={onSubmit}>
        <div className="my-3">
          <input
            className="form-control"
            type="file"
            id="formFile"
            style={inputStyles}
            onChange={onChange}
          />
        </div>
        <Button variant="contained" type="submit" fullWidth>Upload</Button>
      </form>
      <Progress progress={uploadPercentage} />
    </Fragment>
  )
}

export default FileUpload;