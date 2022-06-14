import { createStyles, makeStyles } from '@mui/styles'
import MissingScreenshot from '../../assets/MissingScreenshot.png'
import Box from '@mui/material/Box'

const useStyles = makeStyles((theme) =>
  createStyles({
    contianedImage: {
      width: '100%'
    }
  }),
)

const Screenshot = ({ ss }) => {

  const classes = useStyles()

  return (
    <Box sx={{ width: '100%'}}>
      <img
        className={classes.contianedImage}
        src={ss ? ss : MissingScreenshot}
        alt="Trade screenshot"
      />
    </Box>
  )
}

export default Screenshot