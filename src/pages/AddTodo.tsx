import { Box, Typography,  } from '@mui/material';
import React from 'react';
import AddForm from '../components/AddForm';

const AddTodo = () => {
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
        Add Todo 📌
      </Typography>
      <AddForm />
    </Box>
  );
};

export default AddTodo;
