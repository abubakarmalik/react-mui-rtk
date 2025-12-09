import { Box, Typography } from '@mui/material';
import TableList from '../components/TableList';

const Todos = () => {
  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Todos List 📃
      </Typography>
      <TableList />
    </Box>
  );
};

export default Todos;
