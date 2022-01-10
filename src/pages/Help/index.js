import './Help.css'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import exampleFormat from '../../assets/formatExample.png'

const Help = (props) => {

  return (
    <Container>
      
      <Box>
        <Typography
          sx={{ fontWeight: 700 }}
          variant='h5'
          component='h1'
        >
          Backtest Analyzer
        </Typography>
        <Typography paragraph>
          Upload the CSV files of your backtests and be able to create and examine statistics from your backtests.
        </Typography>
        <Typography
          sx={{ fontWeight: 500 }}
          variant='h6'
          component='h2'
        >
          Problem
        </Typography>
        <Typography paragraph>
          Most of the times we backtest we create and excel sheet where we record all the trades that we take and record the state of points we are interested in or want to improve in our strategy. Through this process we are able to gather a lot of useful data that would be very useful towards improving our trading strategy. However, once the backtest is completed we are not able to analyse the data properly. We missed in a lot of information due to our inability to fully examine all the intel we have collected.
        </Typography>
        <Typography
          sx={{ fontWeight: 500 }}
          variant='h6'
          component='h2'
        >
          How are we missing?
        </Typography>
        <Typography paragraph>
          Most of us do not have advance knowledge of Excel and are unable to apply all the formula and calculations that we would like to perform to truly examine all of the data. Therefore, we end up examining the data by sight and making rough estimation which could end up hugely delaying the development of our trading strategy.
        </Typography>
        <Typography
          sx={{ fontWeight: 500 }}
          variant='h6'
          component='h2'
        >
          Mission
        </Typography>
        <Typography paragraph>
          Our aim is to create a simple and easy to use software to allow traders to analyse all the intel and data they collect through regular trading, backtesting and front testing. Our objective is to assist them in the analysis of the information they have collected and help them improve their trading strategy as fast as possible.
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: 700 }}
          variant='h5'
          component='h1'
        >
          Getting Started
        </Typography>
        <Typography
          sx={{ fontWeight: 700 }}
          variant='h6'
          component='h2'
        >
          Prerequisites
        </Typography>
        <Typography>
          Transform your data into a CSV format. If you are using Excel you can easily transform you data into CSV following these steps:
        </Typography>
        <div className='paragraph'>
          <span className='note'>Note:</span> only CSV files are accepted
        </div>
        <Typography
          sx={{ fontWeight: 700 }}
          variant='h6'
          component='h2'
        >
          Appropriate Naming
        </Typography>
        <Typography>
          Rename the columns of your backtest according to the category they belong. In this step we assume that your data is organised by rows. The categories we distinguish data are metric, results, pair and trade number. Below there is a table on how to rename your columns.
        </Typography>
        <div className='marker'>Here is an example of how it should be done:</div>
        <Paper elevation={0} sx={{ mb: 3 }}>
          <img src={exampleFormat} alt="Example to appropriate naming" />
        </Paper>
        <Typography
          sx={{ fontWeight: 700 }}
          variant='h5'
          component='h1'
        >
          How to use
        </Typography>
      </Box>
    </Container>
  )
}

export default Help;