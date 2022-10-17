
import { useState } from 'react';

import Message from '../common/Message';

import { useUploadDocumentMutation } from '../features/documents/documentsApiSlice';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

const inputStyles = {
  fontSize: '14px',
  boxShadow: '0 0 0 0',
}

const Upload = ({ open, onClose }) => {
  
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
      <Box sx={{ width: '100%', mt: 1 }}>
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
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth={true}>
      <DialogTitle sx={{ color: 'inherit' }}>
        <Typography
          align="center"
          variant="h5"
          sx={{ mt: 1 }}
        >
          File Upload
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {msg ? <Message message={msg} isError={isError} sx={{ mt: 0 }} /> : null}
        <p>{isUpdating}</p>
        <UploadFileRoundedIcon sx={{ fontSize: 50 }} color="primary" />
        <form onSubmit={onSubmit}>

          <Box sx={{ mt: 2 }}>
            <FormLabel>File Source:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio size="small" />} label="Default" />
              <FormControlLabel value="male" disabled control={<Radio size="small" />} label="TraginView Paper Trade" />
              <FormControlLabel value="other" disabled control={<Radio size="small" />} label="MT4" />
            </RadioGroup>
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
            sx={{ mt: 1 }}
            variant="contained"
            type="submit"
            fullWidth
            disableRipple
          >
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Upload;