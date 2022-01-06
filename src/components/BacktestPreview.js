import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

const API = process.env.REACT_APP_API;

const useStyles = makeStyles({
  rigidBox: {
    overflowX: 'scroll' 
  }
})

const BacktestPreview = ({file}) => {

  const classes = useStyles()
  const { token } = useSelector(state => state.auth)
  const [table, setTable] = useState('')

  useEffect(() => {
    if (file !== null) {
      axios.get(API + '/backtests/' + file, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => {
        const data = response.data
        setTable(data)
      })
    }
  }, [file])

  return (
    <Box
      sx={{ mt: 3 }}
      className={classes.rigidBox}
      dangerouslySetInnerHTML={{ __html: table }}
    >
    </Box>
  )
}

export default BacktestPreview;