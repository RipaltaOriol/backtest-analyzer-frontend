import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addFilter,
  selectSetupId,
  selectSetupFilters
} from '../../features/setups/setupSlice';

import { useDeleteFilterSetupMutation } from '../../features/setups/setupsApiSlice';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const FilterList = () => {
  
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);

  const [deleteFilterSetup, { data, isSuccess, isLoading }] = useDeleteFilterSetupMutation();

  let setupId = useSelector(selectSetupId);
  let setupFilters = useSelector(selectSetupFilters);
  if (setupFilters === undefined) {
    setupFilters = []
  }

  if (isSuccess && !isLoading && isValid) {
    const { state, filters } = data;
    dispatch(
      addFilter({ state, filters })
    )
    setIsValid(false)
  }

  const handleDelete = async (id) => {
    const filterId = id['$oid']
    await deleteFilterSetup({ setupId, filterId }).unwrap();
    setIsValid(true)
  };

  return (
    <div>
      { setupFilters.length > 0 && <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        
        {setupFilters.map((filter) => (
          <Chip label={filter.name} variant="outlined" onDelete={() => handleDelete(filter.id)} />
        ))}
      </Stack>
    }
    </div>
    
  )
}

export default FilterList;