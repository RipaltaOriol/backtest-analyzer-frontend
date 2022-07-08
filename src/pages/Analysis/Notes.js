import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import {
    addNotes,
    selectSetupId,
    selectSetupNotes
} from "../../features/setups/setupSlice";
import { useUpdateSetupsMutation } from '../../features/setups/setupsApiSlice';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

const Notes = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { documentId } = useParams();

    const [isValid, setIsValid] = useState(false)
    const setupId = useSelector(selectSetupId);
    const setupNotes = useSelector(selectSetupNotes);

    const [notes, setNotes] = useState(setupNotes);
    const [updateSetups, { data, isLoading, isSuccess }] = useUpdateSetupsMutation();

    useEffect(() => {
        setNotes(setupNotes)
      }, [setupNotes])
    
    const handleSaveNote = async () => {
        if (notes !== setupNotes) {
            try {
                await updateSetups({ documentId, setupId, notes }).unwrap()
                setIsValid(true)
            } catch (err) {
                console.error('Something went wrong', err)
            }
        }
    }

    if (isSuccess && !isLoading && isValid) {
        dispatch(
            addNotes({ notes: data.notes })
        )
        setIsValid(false)
    }

    return (
        <TextField
            className={classes.inputMultiline}
            label="Notes"
            multiline
            fullWidth
            value={notes}
            rows={20}
            variant="filled"
            onChange={(e) => setNotes(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ mt: 1.5, fontSize: 16 }}
                    onClick={() => handleSaveNote()}
                  >
                    {notes === setupNotes ? 'Save' : 'Unsaved'}
                    {notes === setupNotes ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
    )
}

export default Notes;