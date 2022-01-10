import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { increment, removeAuth } from '../redux/auth'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    brand: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar
  }),
)

export default function Layout({ children }) {

  const classes = useStyles()
  const history = useHistory()
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch(removeAuth())
    history.push('/login')
  }

  return (
    <div className="root">
      {/* app bar */}
      <AppBar
        position="fixed" 
        elevation={0}
      >
        <Toolbar>
          <Typography variant='h6' className={classes.brand}>
            Backtest Analyzer
          </Typography>
          <Button variant='contained' href='/manage' disableElevation>Management</Button>
          <Button sx={{ ml: 1 }} variant='contained' href='/lab' disableElevation>Lab</Button>
          <Button sx={{ ml: 1 }} variant='contained' href='/help' disableElevation>Help</Button>
          <Button sx={{ ml: 1 }} color='secondary' variant='contained' onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Container sx={{ mt: 3, maxWidth: '100%' }} maxWidth={false}>
        <div className={classes.toolbar}></div>
        <Box sx={{ mx: 4 }}>
          { children }
        </Box>
      </Container>
    </div>
  )
}
