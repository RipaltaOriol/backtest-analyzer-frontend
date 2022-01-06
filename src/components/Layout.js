import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { increment, removeAuth } from '../redux/auth'
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    brand: {
      flexGrow: 1
    },
  }),
);

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
          <Button variant='contained' href='/manage'>Management</Button>
          <Button sx={{ ml: 2 }} variant='contained' href='/lab'>Lab</Button>
          <Button sx={{ ml: 2 }} variant='contained' href='/help'>Help</Button>
          <Button sx={{ ml: 2 }} color='secondary' variant='contained' onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <div>
        <Container sx={{ mt: 3 }}>
          { children }
        </Container>
      </div>
    </div>
  )
}
