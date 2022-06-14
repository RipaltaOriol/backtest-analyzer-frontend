import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';

// import { getAuth } from '../../redux/slices/authSlice'
import useAuth from '../../hooks/useAuth'
import Message from '../../components/Message'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/overview';

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false)
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    setMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await login({ email, password }).unwrap()
      console.log(userData)
      dispatch(setCredentials({
        token: userData.access_token,
        user: userData.user,
      }))
      setEmail('')
      setPassword('')
      setMsg('Successfully logged in!')
      navigate('/help')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.originalStatus) {
        setMsg(err.data.msg)
        setIsError(true)
      }
    }
    // try {
    //   const response = await axios.post('/login',
    //     {
    //       email,
    //       password
    //     }, {
    //       headers: { 'Content-Type': 'application/json' },
    //       withCredentials: true
    //     }
    //   )
    //   const accessToken = response?.data?.access_token;
    //   const success = response?.data?.success
    //   setAuth({ success, accessToken })
    //   navigate(from, { replace: true })

    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <Container sx={{ my: 5 }}>
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
        {msg && <Message message={msg} isError={isError} sx={{mb: 2}} />}
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
              // endIcon={loading !== 'pending' && <ArrowForwardIosIcon />}
            >
              Signin
              {/* {isAuth} */}
              {/* {loading !== 'pending' && <span>Signin</span>}
              {loading === 'pending' && <CircularProgress color='secondary'  size={30} />} */}
            </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Login;