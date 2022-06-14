import axios from 'axios'
import useDocuments from '../../hooks/useDocuments'
import useDocument from '../../hooks/useDocument'
import FileList from '../../components/FileList'
import RichDataTable from '../../components/DataTable'
import Message from '../../components/Message'
import Typography from '@mui/material/Typography'
import Progress from './Progess'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import LinearProgress from '@mui/material/LinearProgress';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from 'react-redux';
import { useUploadDocumentMutation } from '../../features/documents/documentsApiSlice';

const inputStyles = {
  borderColor: '#075eee',
  boxShadow: '0 0 0 0'
}

const files = [
  'Test Upload 1',
  'lorem ipsum dolor sit amet, consectetur adipis',
  'Backtest 1',
  'Swing Gold 2023 May'
] 

const updateDocuments = false;

const Upload = () => {
  
  // const { documents, setIsDocumentUpload } = useDocuments()
  // const { documentData, documentColumns, setDocument } = useDocument()

  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)

  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useUploadDocumentMutation()

  const [uploadDocument, { isLoading: isUpdating }] = useUploadDocumentMutation()

  const onChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  let progress;

  if (isUpdating) {
    progress = (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    progress = <></>
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (file.type !== 'text/csv') {
      setIsError(true)
      setMsg('This file is not of type CSV')
      return true
    }
    const data = new FormData();
    // const config = {
    //   onUploadProgress: progressEvent => {
    //     setUploadPercentage(
    //       parseInt(
    //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //       )
    //     )
    //     // clear percetage
    //     setTimeout(() => setUploadPercentage(0), 10000)
    //   }
    // }
    data.append('file', file)
    data.append('fileName', fileName)
    uploadDocument(data).unwrap()
    .then((response) => {
      setIsError(!response.success)
      if (response.success) {
        setMsg(response.msg)
        // updateDocuments(true)
      } else {
        setMsg(response.msg)
      }
      
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <Box>
      <Typography
        variant="h1"
        color="primary"
      >
        File Upload
      </Typography>
      {msg ? <Message message={msg} isError={isError} sx={{ mt: 2 }} /> : null}
      <p>{isUpdating}</p>
      <form onSubmit={onSubmit}>
        <Box sx={{ mt: 2 }}>
          <input
            className="form-control"
            type="file"
            id="formFile"
            style={inputStyles}
            onChange={onChange}
          />
        </Box>
        {progress}
        {/* <Progress progress={uploadPercentage} /> */}
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
          fullWidth
          disableRipple
        >
          Upload
        </Button>
      </form>
    </Box>
  )
}

export default Upload;