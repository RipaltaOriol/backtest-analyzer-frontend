import { useContext } from 'react';
import DocumentsContext from '../context/DocumentsProvider';

const useDocuments = () => {
  return useContext(DocumentsContext);
}

export default useDocuments;

// import { useEffect, useState } from 'react'
// import DocumentService from '../services/documentsService'
  
// const useDocument = () => {

//   const [document, setDocument] = useState(null)
//   const [documentData, setDocumentData] = useState([])
//   const [documentColumns, setDocumentColumns] = useState([])

//   useEffect(async () => {
//     if (document) {
//       const { rows, columns } = await DocumentService.getOneDocument(document.id)
//       setDocumentData(rows)
//       setDocumentColumns(columns)
//     }
//   }, [document])

//   return { documentData, documentColumns, setDocument }
// }

// export default useDocument