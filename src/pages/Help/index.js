import './Help.css';
import { useLocation } from 'react-router-dom';

import exampleFormat from '../../assets/formatExample.png';

import Footer from '../../components/Footer';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Help = () => {

  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container sx={{ p: location.pathname !== '/help' ? 3 : 0 }}>
        { location.pathname !== '/help' && <Toolbar /> }
        <Box sx={{ mb: 5 }}>
          <Typography
            variant='h3'
            component='h1'
          >
            Backtest Analyser
          </Typography>
          <Typography varinat='subtitle' sx={{ my: 2 }}>
            Upload the CSV files of your backtests and be able to create and examine statistics from your backtests.
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography
              variant='h5'
              component='h2'
            >
              Problem
            </Typography>
            <Typography variant='body1' sx={{ my: 1 }}>
              Most of the times we backtest we create and excel sheet where we record all the trades that we take and record the state of points we are interested in or want to improve in our strategy. Through this process we are able to gather a lot of useful data that would be very useful towards improving our trading strategy. However, once the backtest is completed we are not able to analyse the data properly. We missed in a lot of information due to our inability to fully examine all the intel we have collected.
            </Typography>
          </Box>
          <Box sx={{ my: 2}}>
            <Typography
              variant='h5'
              component='h2'
            >
              How are we missing?
            </Typography>
            <Typography variant='body1' sx={{ my: 1 }}>
              Most of us do not have advance knowledge of Excel and are unable to apply all the formula and calculations that we would like to perform to truly examine all of the data. Therefore, we end up examining the data by sight and making rough estimation which could end up hugely delaying the development of our trading strategy.
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography
              variant='h5'
              component='h2'
            >
              Mission
            </Typography>
            <Typography variant='body1' sx={{ my: 1 }}>
              Our aim is to create a simple and easy to use software to allow traders to analyse all the intel and data they collect through regular trading, backtesting and front testing. Our objective is to assist them in the analysis of the information they have collected and help them improve their trading strategy as fast as possible.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant='h4'
            component='h1'
          >
            Getting Started
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography
              variant='h5'
              component='h2'
            >
              Prerequisites
            </Typography>
            <Typography variant='body1' sx={{ my: 1 }}>
              Transform your data into a CSV format. If you are using Excel you can easily transform you data into CSV following these steps:
            </Typography>
            <Box className='instructions'>
              <Typography display='inline'>File</Typography>
              <ArrowForwardIosIcon fontSize="small" />
              <Typography display='inline'>Save As</Typography>
              <ArrowForwardIosIcon fontSize="small" />
              <Typography display='inline'>CSV UTF-8 (Comma-delimited) (.csv) </Typography>
            </Box>
            <Typography variant="overline" display='block'>
              Only CSV files are accepted
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography
              variant='h5'
              component='h2'
            >
              Appropriate Naming
            </Typography>
            <Typography variant='body1' sx={{ my: 1 }}>
              Rename the columns of your backtest according to the category they belong. In this step we assume that your data is organised by rows. The categories we distinguish data are metric, results, pair and trade number. Below there is a table on how to rename your columns.
            </Typography>
            <Typography variant="overline" display='block'>
              Follow this table to know how to name your columns
            </Typography>
            <Paper elevation={0} sx={{ mb: 3 }}>
              <img src={exampleFormat} alt="Example to appropriate naming" />
            </Paper>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography
              variant='h5'
              component='h1'
            >
              Example
            </Typography>
            <span>Video example</span>
          </Box>
          <Typography variant='overline'>Enjoy - More documentation coming soon</Typography>
      </Box>
      </Container>
      { location.pathname !== '/help' && <Footer /> }
    </Box>
  )
}

export default Help;