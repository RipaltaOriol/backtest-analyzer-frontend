import { createStyles, makeStyles } from '@mui/styles';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles((theme) =>
  createStyles({
    noWrap: {
      overflowX: 'auto',
    }
  }),
)

const FileList = ({ heading, files, changeFile }) => {

  const classes = useStyles();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant='h5'
        gutterBottom
      >
        {heading}:
      </Typography>
      <Paper variant='outlined'>
        <MenuList sx={{ p: 0 }}>
          {files ? files.map((file) => {
            return (
              <MenuItem>
                <ListItemText
                  className={classes.noWrap}
                  key={file.id}
                  onClick={() => { changeFile({ id: file.id, name: file.name }) }}
                >
                  {file.name}
                </ListItemText>
                </MenuItem>
            )
          })
        : (
          <MenuItem disabled>
            <ListItemText className={classes.noWrap}>
              No items were found in the database
            </ListItemText>
          </MenuItem>
        )
        }
        </MenuList>
      </Paper>
    </Box>
    
  )
}

export default FileList