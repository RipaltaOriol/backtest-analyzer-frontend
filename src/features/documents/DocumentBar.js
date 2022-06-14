import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDocumentsQuery } from "./documentsApiSlice"
import { selectAllDocuments } from './documentsApiSlice';

import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const DocumentBar = () => {

    const location = useLocation();
    const [currentDoc, setCurrentDoc] = useState('')

    const {
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetDocumentsQuery()

    const orderedDocuments = useSelector(selectAllDocuments)

    const changeDocument = async (id) => {
        setCurrentDoc(id)
      };

    let content;

    if (isLoading) {
        content = <></>;
    } else if (isSuccess) {
        
        content = orderedDocuments.map((doc, idx) => (
            <ListItemButton 
                key={doc.id}
                component={Link}
                to={'/' + doc.id}
                sx={{ py: 0.5 }}
                selected={'/' + doc.id === location.pathname}
                onClick={() => changeDocument(doc.id)}
                disableRipple
            >
            <ListItemText
                primary={doc.name}
                sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
                }}
            />
            </ListItemButton>
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default DocumentBar;