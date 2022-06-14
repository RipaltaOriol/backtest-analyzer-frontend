import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    setAuth(prev => {
      return {
        ...prev,
        success: response.data.success,
        accessToken: response.data.access_token
      }
    })
    return response.data.access_token
  }
  return refresh;
}

export default useRefreshToken;