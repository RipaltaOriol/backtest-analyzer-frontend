import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const Message = ({ message, setMessage, isError }) => {

  const [open, setOpen] = useState(false)
  const alertType = isError ? 'error' : 'success'

  useEffect(() => {
    if (message) { setOpen(true) }
  }, [message])

  return (
    <Collapse in={open}>
      <Alert
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
              setMessage(null)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  )
}

export default Message