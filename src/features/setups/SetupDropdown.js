import { useState, useEffect } from 'react';

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


let SetupDropdown = ({ defaultSetup, setups, changeSetup }) => {

  const [selectedSetup, setSelectedSetup] = useState(defaultSetup?.id || '');

  useEffect(() => {
    if (defaultSetup) {
      setSelectedSetup(defaultSetup?.id);
      changeSetup(defaultSetup)
    }
  }, [defaultSetup])

  const handleChangeSetup = (e) => {
    const changedSetup = setups.find(setup => setup.id === e.target.value)
    setSelectedSetup(changedSetup?.id)
    changeSetup(changedSetup)
  }
   
  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel>Setup</InputLabel>
        { defaultSetup ? (
          <Select
            value={selectedSetup}
            onChange={(e) => handleChangeSetup(e)}
            label="Setup"
          >
            {setups.map(setup => (
              <MenuItem key={setup.id} value={setup.id}>{setup.name}</MenuItem>
            ))}
          </Select> ) : (<></>)
        }
    </FormControl>
  );
};

export default SetupDropdown;
