import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const useStyles = makeStyles({
  filterBorder: {
    border: '1.5px solid #263238',
    borderRadius: '5px'
  },
  squareHover: {
    "&:hover": {
      borderRadius: '5px',
      TransitionEvent: 'none !important'
    }
  }
});


const FilterList = ({filters, removeFilter}) => {

  const classes = useStyles();

  console.log(filters)
  filters.map((name) => {
    console.log(name)
  })

  return (
    <List disablePadding>
      {filters.map((filter) => (
        <ListItem
          disablePadding
          className={classes.filterBorder}
          sx={{ my: 1 }}
        >
          <FilterAltOutlinedIcon sx={{ ml: 1 }}/>
          <ListItemText
            sx={{ ml: 1.5 }}
            primary={filter.action + ' - ' + filter.filter + ' - ' + filter.value}
          />
          <IconButton
            sx={{ m: 0.5 }}
            size='small'
            onClick={() => removeFilter(filter)}
            className={classes.squareHover}
          >
            <DeleteIcon className={classes.squareHover}/>
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FilterList;