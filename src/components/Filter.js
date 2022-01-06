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

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked)
    setFilterValue(newChecked.toString())
  }

  const dropdownUniqueOptions = (property) => {
    if (property.unique) {
      return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {property.unique.map((value, i) => {
            return (
              <ListItem
                key={i}
                disablePadding
                sx={{ m: 0 }}
              >
                <ListItemButton sx={{ py: 0 }} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value} />
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
          <Paper sx={{ width: '100%', height: 320, overflow: 'auto' }} variant='outlined'>
            <MenuList>
              {filterList.map((filter, i) => {
                return (
                  <MenuItem key={i}>
                    <ListItemText
                      key={i}
                      onClick={() => setSelectFilter(filter)}
                    >
                      {filter.name}
                    </ListItemText>
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
          <Paper sx={{ height: 320, overflow: 'auto' }} variant='outlined'>
            <MenuList>
              { selectFilter && (selectFilter.dataType === 'float64' || selectFilter.dataType === 'int64') && (
                <>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('numericInclude')}>
                    Include
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('numericExclude')}>
                    Exclue
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('bigger')}>
                    Bigger
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('smaller')}>
                    Smaller
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('range')}>
                    Range
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('notRange')}>
                    Not Range
                  </ListItemText>
                </MenuItem>
              </>
              ) }
              { selectFilter && selectFilter.dataType === 'object' && (
                <>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('textInclude')}>
                    Include
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => setFilterAction('textExclude')}>
                    Exclue
                  </ListItemText>
                </MenuItem>
              </>
              ) }
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.centerIcon}>
          <ArrowForwardIosIcon />
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ height: 320, overflow: 'auto' }} variant='outlined'>
            <Box sx={{ m: 3 }}>
              <Typography>
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