import Box from '@mui/material/Box';

const StatsComponent = ({stats}) => {
  return (
    <Box sx={{ mt: 3 }} dangerouslySetInnerHTML={{ __html: stats }}></Box>
  )
}

export default StatsComponent;