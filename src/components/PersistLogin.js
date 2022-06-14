import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectCurrentToken } from '../features/auth/authSlice';
import { useRefreshTokenMutation } from '../features/auth/authApiSlice';

const PersistLogin = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken)

  const [isWorking, setIsWorking] = useState(true);
  const [refreshToken, {isLoading}] = useRefreshTokenMutation()

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const refreshedToken = await refreshToken().unwrap()
        await dispatch(setCredentials({
          token: refreshedToken.access_token,
          user: refreshedToken.user,
        }))
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsWorking(false);
      }
    }
    !token ? verifyRefreshToken() : setIsWorking(false);

    return () => isMounted = false;

  }, [])

  return (
    <>
      {isWorking 
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  )
}

export default PersistLogin;