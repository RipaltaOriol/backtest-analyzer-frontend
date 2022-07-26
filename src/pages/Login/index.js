import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Footer from '../../components/Footer';

import { setCredentials } from '../../features/auth/authSlice';
import { setLoginMsg } from '../../features/messages/messagesSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { selectLoginMsg } from '../../features/messages/messagesSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Message from '../../components/Message';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/overview';

  const msg = useSelector(selectLoginMsg)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const [login] = useLoginMutation();

  useEffect(() => {
    if (msg !== 'Successfully logged out!') {
      dispatch(setLoginMsg({ msg: '' }));
    }
    
  }, [email, password])

  // Handles the login logic
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({
        token: userData.access_token,
        user: userData.user,
      }))
      setEmail('')
      setPassword('')
      dispatch(setLoginMsg({ msg: 'Successfully logged in!' }))
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.originalStatus) {
        dispatch(setLoginMsg({ msg: err?.data?.msg || 'Something went wrong' }))
        setIsError(true)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container sx={{ my: 5 }}>
        <Toolbar />
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
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Login;