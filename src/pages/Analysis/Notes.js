import { useEffect, useState } from 'react';

import { useUpdateSetupsMutation } from '../../features/setups/setupsSlice';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    inputMultiline : {
      height: "100%",
      "& .MuiInputBase-root": {
        height: "100%",
        display: "flex",
        alignItems: "start"
      }
    },
  }),
)

const Notes = ({ setupId, notes, isOpened }) => {

  const classes = useStyles();
  const [setupNotes, setSetupNotes] = useState(notes);

  const [updateSetups] = useUpdateSetupsMutation();

  useEffect(() => {
    setSetupNotes(notes)
  }, [notes])


  const handleSaveNote = async () => {
    await updateSetups({ setupId, notes: setupNotes }).unwrap()
  }

  return (
    <>
      { isOpened && (
        <TextField
          className={classes.inputMultiline}
          label="Notes"
          multiline
          fullWidth
          value={setupNotes || ''}
          rows={20}
          variant="filled"
          onChange={(e) => setSetupNotes(e.target.value)}
          InputProps={{
            endAdornment: 
              notes !== setupNotes ? 
              (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ mt: 1.5, fontSize: 16 }}
                    color='primary'
                    variant='outlined'
                    onClick={() => handleSaveNote()}
                  >
                    Save
                    <LockOpenOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ) : <></>
          }}
        />
      )}
    </>
  )
}

export default Notes;