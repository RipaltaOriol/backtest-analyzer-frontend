import { useContext } from 'react';
import DocumentsContext from '../context/DocumentsProvider';

const useDocuments = () => {
  return useContext(DocumentsContext);
}

export default useDocuments;


// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import DocumentsService from '../services/documentsService'

// const useDocuments = () => {

//   let navigate = useNavigate()
//   const { isAuthorized } = useSelector(state => state.auth)
//   const [documents, setDocuments] = useState([])
//   const [isDocumentUpload, setIsDocumentUpload] = useState(false)


//   useEffect(async () => {
//     if (!isAuthorized) navigate('/login')
//     // possible bug here with document upload
//     const documentList = await DocumentsService.getAllDocuments()
//     await setDocuments(documentList)
//   }, [isAuthorized, isDocumentUpload])

//   return { documents, setIsDocumentUpload }
// }

// export default useDocuments