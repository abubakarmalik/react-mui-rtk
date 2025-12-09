import { Box, Typography } from '@mui/material';
import DetailsCard from '../components/DetailsCard';

const DetailsTodo = () => {
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
        Todo Details 🔊
      </Typography>
      <DetailsCard />
    </Box>
  );
};

export default DetailsTodo;
