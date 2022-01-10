import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { color: 'primary' },
          style: {
            '&:hover': {
              color: '#fff'
            }
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#20331a',
          '&:hover': {
            backgroundColor: '#dbead7'
          },
          '&:focus': {
            backgroundColor: '#dbead7'
          }
        }
      }
    }
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  palette: {
    primary: {
      main: '#558745',
      light: '#33512A',
      dark: '#66A253',
      constrastText: '#fff',
      '&:hover': {
        color: '#000'
      }
    },
    secondary: {
      main: '#ecf39e',
      light: '#bfab67',
      dark: '#bece7a'
    },
    action: {
      selectedOpacity: .8
    }
  }
})


export default theme