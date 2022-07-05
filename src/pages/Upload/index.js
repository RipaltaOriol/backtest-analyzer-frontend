
import { useState } from 'react';

import Message from '../../components/Message';

import { useUploadDocumentMutation } from '../../features/documents/documentsApiSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const inputStyles = {
  borderColor: '#075eee',
  boxShadow: '0 0 0 0',
}

const Upload = () => {
  
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState('');
  const [isError, setIsError] = useState(false);
  const [fileName, setFileName] = useState('Choose File');

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
    e.preventDefault();

    if (file.type !== 'text/csv') {
      setIsError(true)
      setMsg('This file is not of type CSV')
      return true
    }

    const data = new FormData();
   
    data.append('file', file)
    data.append('fileName', fileName)

    uploadDocument(data).unwrap()
    .then((response) => {
      setIsError(!response.success)
      if (response.success) {
        setMsg(response.msg)
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
        {/* Progress Bar */}
        {progress}
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