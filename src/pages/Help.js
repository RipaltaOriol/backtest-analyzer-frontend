import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import exampleFormat from '../assets/formatExample.png'

const Help = (props) => {

  return (
    <Container>
      <Typography variant='h1'>
        Backtest Analyzer
      </Typography>
      <Typography paragraph variant='h6'>
        Upload the CSV files of your backtests and be able to create and examine statistics from your backtests.
      </Typography>
      <Box>
        <Typography variant='h2'>
          Problem
        </Typography>
        <Typography paragraph variant='h6'>
          Most of the times we backtest we create and excel sheet where we record all the trades that we take and record the state of points we are interested in or want to improve in our strategy. Through this process we are able to gather a lot of useful data that would be very useful towards improving our trading strategy. However, once the backtest is completed we are not able to analyse the data properly. We missed in a lot of information due to our inability to fully examine all the intel we have collected.
        </Typography>
        <Typography variant='h2'>
          How are we missing?
        </Typography>
        <Typography paragraph variant='h6'>
          Most of us do not have advance knowledge of Excel and are unable to apply all the formula and calculations that we would like to perform to truly examine all of the data. Therefore, we end up examining the data by sight and making rough estimation which could end up hugely delaying the development of our trading strategy.
        </Typography>
        <Typography variant='h2'>
          Mission
        </Typography>
        <Typography paragraph variant='h6'>
          Our aim is to create a simple and easy to use software to allow traders to analyse all the intel and data they collect through regular trading, backtesting and front testing. Our objective is to assist them in the analysis of the information they have collected and help them improve their trading strategy as fast as possible.
        </Typography>
      </Box>
      <Box>
        <Typography variant='h2'>
          How to Use
        </Typography>
        <Typography variant='h3'>
          Prerequisites
        </Typography>
        <Typography paragraph variant='h6'>
          Transform your data into a CSV format. If you are using Excel you can easily transform you data into CSV following these steps:
          Note: only CSV files are accepted
        </Typography>
        <Typography variant='h3'>
          Appropriate Naming
        </Typography>
        <Typography paragraph variant='h6'>
          Rename the columns of your backtest according to the category they belong. In this step we assume that your data is organised by rows. The categories we distinguish data are metric, results, pair and trade number. Below there is a table on how to rename your columns.
          Here is an example of how it should be done:
        </Typography>
        <Paper elevation={0} sx={{ mb: 3 }}>
          <img src={exampleFormat} alt="Example to appropriate naming" />
        </Paper>
        <Typography variant='h3'>
          Update your Data
        </Typography>
        <Typography paragraph variant='h6'>
          After creating an account go the the Management tab and upload your data. After successfully uploading your backtest you will be able to see your file in the file list below and preview your data set.
        </Typography>
        <Typography variant='h3'>
          Analyse your Data
        </Typography>
        <Typography paragraph variant='h6'>
          Now go to the Lab and begin analysing your data and improving your trading plan.
        </Typography>
      </Box>
    </Container>
  )
}

export default Help;