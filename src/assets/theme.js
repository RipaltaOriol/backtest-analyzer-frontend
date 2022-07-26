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
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '10%'
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { color: 'primary', variant: 'contained' },
          style: {
            '&:hover': {
              color: '#fff'
            }
          },
        }, {
          props: { color: 'primary', variant: 'text' },
          style: {
            '&:hover': {
              color: '#fff',
              backgroundColor: '#075eee'
            }
          },
        }, {
          props: { color: 'secondary' },
          style: {
            color: '#fff',
            '&:hover': {
              color: '#fff',
              backgroundColor: '#cf8208'
            }
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#b4caf0'
          },
          '&:focus': {
            backgroundColor: '#b4caf0'
          },
          '&.Mui-selected': {
            backgroundColor: '#8db1ef',
            '&:hover': {
              backgroundColor: '#8db1ef',
            }
          },
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: '#000000de'
          },
          "&.Mui-selected": {
            backgroundColor: '#075eee',
            color: '#fff',
            "&:hover": {
              backgroundColor: '#075eee'
            },
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
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
    h1: {
      fontSize: '28px',
      fontWeight: '400'
    }
  },
  palette: {
    primary: {
      main: '#075eee',
    },
    secondary: {
      main: '#e8920b',
      constrastText: '#fff'
    },
    action: {
      selectedOpacity: .8
    }
  }
})


export default theme