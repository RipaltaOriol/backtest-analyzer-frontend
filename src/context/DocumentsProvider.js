import { useState, createContext } from 'react';

export const DocumentsContext = createContext({})

export const DocumentsProvider = ({ children }) => {

  const [documents, setDocuments] = useState({
    all: []
  });
  
  return (
    <DocumentsContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentsContext.Provider>
  )
}

export default DocumentsContext;