import { useDeleteFilterSetupMutation } from '../../features/setups/setupsSlice';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const FilterList = ({ setupId, filters }) => {
  
  const [deleteFilterSetup] = useDeleteFilterSetupMutation();

  const handleDelete = async (filterId) => {
    try {
      await deleteFilterSetup({ setupId, filterId }).unwrap()
    } catch (err) {
      console.error('Something went wrong', err)
    }
  };

  return (
    <Box>
        { filters && filters.length > 0 && 
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {
                    filters.map((filter) => (
                        <Chip label={filter.name} variant="outlined" onDelete={() => handleDelete(filter.id)} />
                    ))
                }
            </Stack>
        }
    </Box>
  )
}

export default FilterList;