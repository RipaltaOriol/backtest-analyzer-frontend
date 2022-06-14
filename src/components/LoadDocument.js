import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useDocuments from '../hooks/useDocuments';

const LoadDocument = () => {
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  
  const { auth } = useAuth();
  const { documents, setDocuments } = useDocuments();


  useEffect(() => {
    let isMounted = true;
    
    const controller = new AbortController();

    const getDocuments = async () => {
      try {
        const response = await axiosPrivate.get('/documents', {
          signal: controller.signal
        })
      
        isMounted && setDocuments(prev => {
          return {
            ...prev,
            currentId: response.data.documents[0].id,
            currentName: response.data.documents[0].name,
            all: response.data.documents
          }
        })
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true })
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    !documents?.all.length ? getDocuments() : setIsLoading(false);
    
    // const verifyRefreshToken = async () => {
    //   try {
    //     await refresh();
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     isMounted && setIsLoading(false);
    //   }
    // }

    // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
      controller.abort()
    }

  }, [])

  return (
    <>
      {isLoading 
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  )
}

export default LoadDocument;