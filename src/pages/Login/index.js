import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../redux/auth'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Login = () => {

  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (val) => {
    setErrorMessage(val)
  }

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
        <Box
          sx={{ maxWidth: '400px', mx: 'auto'}}
        >
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
            component="h1"
            color="primary"
          >
            Log in
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ mb: 2 }}
              label="Email"
              variant="standard"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ mb: 2 }}
              type="password"
              label="Password"
              variant="standard"
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