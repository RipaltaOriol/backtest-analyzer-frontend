import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Notes = ({ labId, note, changeNote }) => {

  const [newNote, setNewNote] = useState(note)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch('/labs/' + labId + '/note', {
      note: newNote
    })
    .then((response) => {
      changeNote(response.data)
    })
    .catch((err) => {
      setNewNote(note)
    })
  }

  useEffect(() => {
    setNewNote(note)
  }, [note])

  return (
    <Box>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          multiline
          sx={{ mb: 1 }}
          label="Notes"
          rows={4}
          placeholder='Type your notes'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button
          type="submit"
          variant='contained'
        >
          Save Note
        </Button>
      </form>
    </Box>
  )
}

export default Notes