import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const UpdateDocument = () => {

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5'>:::Document Name</Typography>
                {/* Add button to update here */}
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }}/>
            {/* Buttons to add go here */}
            <Box>
                <Stack
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <Typography>Add new item</Typography>
                    {/* Have one for ID which cannot be changed */}
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                </Stack>
                <Button>Add</Button>
                <Button>Cancel</Button>
            </Box>
            <h1>Hello</h1>
            {/* Table goes here */}
        </Box>
    )
}

export default UpdateDocument;