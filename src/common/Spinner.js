import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 3
    }}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
