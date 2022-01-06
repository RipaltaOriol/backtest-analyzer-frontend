import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../redux/auth'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const Login = () => {

  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    dispatch(getAuth(user))
  }

  useEffect(() => {
    if (token) history.push('/manage')
  }, [token])

  return (
    <Container>
      { token ? 'You are logged in' : (
        <Box>
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            align="left"
          >
            Log in
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              className={classes.field}
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classes.field}
              type="password"
              label="Password"
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
              >
                Signin
              </Button>
          </form>
        </Box>
      )}
    </Container>
  )
}

export default Login