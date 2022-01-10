import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles({
  centerIcon: {
    textAlign: 'center' 
  }
})

const Filter = ({applyFilter, filterList}) => {

  const classes = useStyles()
  const [selectFilter, setSelectFilter] = useState(null)
  const [filterAction, setFilterAction] = useState('none')
  const [checked, setChecked] = useState([]);
  const [filterValue, setFilterValue] = useState('')
  const [fieldIndex, setFieldIndex] = useState(-1);
  const [filterIndex, setFilterIndex] = useState(-1);
  const buttonProps = (idx, value) => ({
    selected: fieldIndex === idx,
    onClick: () => {
      setFieldIndex(idx)
      setSelectFilter(value)
    },
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked)
    setFilterValue(newChecked)
  }

  const dropdownUniqueOptions = (property) => {
    if (property.unique) {
      return (
        <List>
          {property.unique.map((value, i) => {
            if (value !== null)
            return (
              <ListItem
                key={i}
                disablePadding
                sx={{ m: 0 }}
              >
                <ListItemButton sx={{ px: 3, py: 0 }} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value}/>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )
    }
    
  }

  const listFilterActions = {
    'numericInclude': {
      text: 'List all the items to include separated with commas. Do not use extra spaces.',
      input: (<TextField sx={{ mt: 2 }} label='Include' variant='outlined' placeholder='i.e. 2,4,5.3,10' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'numericExclude': {
      text: 'List all the items to exclude separated with commas. Do not use extra spaces.',
      input: (<TextField sx={{ mt: 2 }} label='Exclude' variant='outlined' placeholder='i.e. 2,4,5.3,10' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'bigger': {
      text: 'Input the minimum non-valid value to filter from. For example, > 10.',
      input: (<TextField sx={{ mt: 2 }} label='Bigger' variant="outlined" placeholder='i.e. 10' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'smaller': {
      text: 'Input the maximum non-valid value to filter from. For example, < 10.',
      input: (<TextField sx={{ mt: 2 }} label='Smaller' variant="outlined" placeholder='i.e. 10' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'range': {
      text: 'Input the range you want to filter by separated by [/]. For  example, 2/8.',
      input: (<TextField sx={{ mt: 2 }} label='Range' variant="outlined" placeholder='i.e. 2/8' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'notRange': {
      text: 'Input the range you want to exclude separated by [/]. For  example, 2/8.',
      input: (<TextField sx={{ mt: 2 }} label='Not Range' variant="outlined" placeholder='i.e. 2/8' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}/>)
    },
    'textInclude': {
      text: 'Check all the items you want to include.',
      input: dropdownUniqueOptions('include')
    },
    'textExclude': {
      text: 'Check all the items you want to exclude.',
      input: dropdownUniqueOptions('exclude')
    },
    'none': {
      text: '',
      input: ''
    }
  }

  return (
    <Box>
      <Grid
        container
        sx={{ my: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Typography variant="h6">Field</Typography>
          <Paper sx={{ width: '100%', height: 300, overflow: 'auto' }} variant='outlined'>
            <MenuList sx={{ p: 0 }}>
              {filterList.map((filter, i) => {
                return (
                  <MenuItem key={i} sx={{ p: 0 }}>
                    <ListItemButton
                      key={i}
                      {...buttonProps(i, filter)}
                      // onClick={() => setSelectFilter(filter)}
                    >
                      {filter.name}
                    </ListItemButton>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.centerIcon}>
          <ArrowForwardIosIcon color='primary'/>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Filter</Typography>
          <Paper sx={{ height: 300, overflow: 'auto' }} variant='outlined'>
            <MenuList sx={{ p: 0 }}>
              { selectFilter && (selectFilter.dataType === 'float64' || selectFilter.dataType === 'int64') && (
                <>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 0}
                    onClick={() => {
                      setFilterIndex(0)
                      setFilterAction('numericInclude')}
                    }
                  >
                    Include
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 1}
                    onClick={() => {
                      setFilterIndex(1)
                      setFilterAction('numericExclude')
                    }}
                  >
                    Exclue
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton 
                    selected={filterIndex === 2}
                    onClick={() => {
                      setFilterIndex(2)
                      setFilterAction('bigger')
                    }}
                  >
                    Bigger
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 3}
                    onClick={() => {
                      setFilterIndex(3)
                      setFilterAction('smaller')
                    }}
                  >
                    Smaller
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 4}
                    onClick={() => {
                      setFilterIndex(4)
                      setFilterAction('range')
                    }}
                  >
                    Range
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 5}
                    onClick={() => {
                      setFilterIndex(5)
                      setFilterAction('notRange')
                    }}
                  >
                    Not Range
                  </ListItemButton>
                </MenuItem>
              </>
              ) }
              { selectFilter && selectFilter.dataType === 'object' && (
                <>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 6}
                    onClick={() => {
                      setFilterIndex(6)
                      setFilterAction('textInclude')
                    }}
                  >
                    Include
                  </ListItemButton>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <ListItemButton
                    selected={filterIndex === 7}
                    onClick={() => {
                      setFilterIndex(7)
                      setFilterAction('textExclude')
                    }}
                  >
                    Exclue
                  </ListItemButton>
                </MenuItem>
              </>
              ) }
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.centerIcon}>
          <ArrowForwardIosIcon color='primary' />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Action</Typography>
          <Paper sx={{ minHeight: 300, height: 300, overflow: 'auto' }} variant='outlined'>
            <Box>
              <Typography sx={{ p: 2, pb: 0 }}>
                {listFilterActions[filterAction].text}
              </Typography>
              {(filterAction === 'textInclude' || filterAction === 'textExclude') ?
                dropdownUniqueOptions(selectFilter)
              :
                listFilterActions[filterAction].input
              }
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box display='flex' justifyContent='center'>
        <Button
          sx={{ mx: 1 }}
          variant='contained'
          onClick={() => applyFilter(selectFilter, filterAction, filterValue)}
        >
          Accept
        </Button>
        <Button
          sx={{ mx: 1 }}
          variant='contained'
          color='error'
          onClick={() => applyFilter()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default Filter;