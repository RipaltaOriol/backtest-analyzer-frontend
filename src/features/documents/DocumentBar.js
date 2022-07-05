import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { selectAllDocuments } from './documentsApiSlice';
import { useGetDocumentsQuery } from './documentsApiSlice';

import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';


const DocumentBar = () => {

    const location = useLocation();

    const {
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetDocumentsQuery()

    const orderedDocuments = useSelector(selectAllDocuments)

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
                selected={location.pathname.includes(doc.id)}
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