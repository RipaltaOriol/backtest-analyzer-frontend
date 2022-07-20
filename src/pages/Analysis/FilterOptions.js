
import { useState, useEffect } from 'react'

import { useAddFilterSetupMutation } from '../../features/setups/setupsSlice';

import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const operations = {
    numeric: {
        gt: '<',
        lt: '>',
        eq: '=',
        nq: '≠',
    },
    string: {
        in: 'Include',
        nin: 'Not include'
    }
}

const FilterOptions = ({ open, handleClose, setupId, options }) => {

    const [column, setColumn] = useState('')
    const [values, setValues] = useState([])
    const [number, setNumber] = useState()
    const [operation, setOperation] = useState('')
    const [optionIdx, setOptionIdx] = useState(-1)

    const [addFilterSetup] = useAddFilterSetupMutation()
    
    // useEffect(() => { }, [options]) // test if this is necessary

    const handleValueChange = (event) => {
        const {
          target: { value },
        } = event;
        setValues(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleApply = async () => {
        if (column === '' || operation === '' || number === '' || number === undefined) {
            return handleClose()
        }

        const filter = {
            column,
            operation,
        }

        if (optionIdx !== -1 && options[optionIdx].type === 'number') {
            filter.value = [Number(number)]
        }
        if (optionIdx !== -1 && options[optionIdx].type === 'string') {
            filter.value = values
        }
        try {
            await addFilterSetup({ setupId, filter }).unwrap()
            setColumn('')
            setValues([])
            setNumber(null)
            setOperation('')
            setOptionIdx(-1)
            handleClose()
        } catch (err) {
            console.error('Something went wrong', err)
        }
    }

    return(
        <Dialog open={open} onClose={handleClose} fullWidth={true}> 
            <DialogTitle>Filter</DialogTitle>
            { options && (
                <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Select from the dropdown to apply filters to your setups.
                </DialogContentText>

                <FormControl fullWidth sx={{ my: 1 }}>
                    <InputLabel>Column</InputLabel>
                    <Select
                        value={column}
                        label="Column"
                        MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                        onChange={(e, child) => {
                            setColumn(e.target.value)
                            setOptionIdx(child.props.id)
                        }}
                    >
                        {options.map((option, idx) => (
                            <MenuItem key={idx} id={idx} value={option.id}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel>Operation</InputLabel>
                    <Select
                        value={operation}
                        label="Operation"
                        MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                        onChange={(e) => {
                            setOperation(e.target.value)
                        }}
                    >
                        { optionIdx !== -1 ? options[optionIdx].type === 'number' ?
                            Object.keys(operations.numeric).map((item, idx) => (
                                <MenuItem key={idx} value={item}>{operations.numeric[item]}</MenuItem>
                            ))
                            :
                            Object.keys(operations.string).map((item, idx) => (
                                <MenuItem key={idx} value={item}>{operations.string[item]}</MenuItem>
                            ))
                        : (<></>)}
                    </Select>
                </FormControl>
                { optionIdx !== -1 ? options[optionIdx].type === 'string' ? (
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel>Value</InputLabel>
                        <Select
                            label="Value"
                            multiple
                            value={values}
                            onChange={handleValueChange}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
                        >
                            {options[optionIdx].values.map((value, idx) => (
                                <MenuItem key={idx} value={value}>
                                    <Checkbox checked={values.indexOf(value) > -1} />
                                    <ListItemText primary={value} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> )
                    : (
                    <TextField
                        fullWidth
                        value={number}
                        type='number'
                        label="Value"
                        variant="outlined"
                        onChange={(e) => setNumber([e.target.value])}
                    />
                    )
                : (<></>)}
            </DialogContent>
            )}
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApply}>
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterOptions;