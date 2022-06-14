import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
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

  return (
    <List sx={{ my: 2 }} disablePadding>
      {filters.map((filter, idx) => (
        <Alert
          key={idx}
          icon={<FilterAltOutlinedIcon fontSize="inherit" />}
          action={
            <IconButton
              size="small"
              onClick={() => { removeFilter(filter.filter, filter.action, filter.value, 'delete') }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {filter.filter.split("_").pop() + ' '}
          when 
          {' ' + filter.action
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => {
            return str.toLowerCase();
          })}: {filter.value}
        </Alert>
      ))}
    </List>
  )
}

export default FilterList;