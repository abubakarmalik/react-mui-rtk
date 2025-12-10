import { Box, Button, Typography } from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        height: '80vh',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">CURD Operations With Redux ToolKit</Typography>
      <Box>
        <Button
          variant="outlined"
          startIcon={<SourceIcon />}
          sx={{
            mr: 1,
            borderColor: 'primary.main',
            color: 'primary.contrastText',
            ':hover': { borderColor: 'primary.light' },
          }}
          onClick={() => navigate('/todos')}
        >
          Todos
        </Button>
        <Button
          variant="contained"
          endIcon={<AddBoxIcon />}
          sx={{
            ml: 1,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            ':hover': { backgroundColor: 'primary.light' },
          }}
          onClick={() => navigate('/add')}
        >
          Add Todo
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
