import { Paper, TextField, Button, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from 'react';
import { addTodoAsync, editTodoAsync } from '../features/todos/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddForm = () => {
  // creating dispatch
  const dispatch = useDispatch();
  // creating location
  const location = useLocation();
  const { todoToEdit } = location.state || {};

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (todoToEdit) {
      setFormData({
        id: todoToEdit.id || null,
        name: todoToEdit.name || '',
        email: todoToEdit.email || '',
        phone: todoToEdit.phone || '',
        address: todoToEdit.address || '',
      });
    }
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    try {
      e.preventDefault();
      const { id, name, email, phone, address } = formData;
      const thunk = id;

      return toast.promise(
        dispatch(
          thunk
            ? editTodoAsync({ id, name, email, phone, address })
            : addTodoAsync({ name, email, phone, address }),
        ),
        {
          loading: thunk ? 'Updating' : 'Saving...',
          success: thunk ? <b>Todo Updated</b> : <b>Todo Added</b>,
          error: thunk ? <b>Failed to Update</b> : <b>Failed to Save</b>,
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({ id: null, name: '', email: '', phone: '', address: '' });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#1b151b',
        border: 1,
        borderRadius: '10px',
        color: 'primary.main',
        p: '2rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleOnSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 350 }}
      >
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleOnChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.contrastText',
              borderWidth: '1px',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: 'primary.contrastText',
            },
            '& .MuiInputLabel-outlined': {
              color: 'primary.contrastText',
            },
            input: {
              color: '#fff',
            },
          }}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleOnChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.contrastText',
              borderWidth: '1px',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: 'primary.contrastText',
            },
            '& .MuiInputLabel-outlined': {
              color: 'primary.contrastText',
            },
            input: {
              color: '#fff',
            },
          }}
          required
        />
        <TextField
          name="phone"
          label="Phone"
          variant="outlined"
          value={formData.phone}
          onChange={handleOnChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.contrastText',
              borderWidth: '1px',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: 'primary.contrastText',
            },
            '& .MuiInputLabel-outlined': {
              color: 'primary.contrastText',
            },
            input: {
              color: '#fff',
            },
          }}
          required
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          value={formData.address}
          onChange={handleOnChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.contrastText',
              borderWidth: '1px',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: 'primary.contrastText',
            },
            '& .MuiInputLabel-outlined': {
              color: 'primary.contrastText',
            },
            input: {
              color: '#fff',
            },
          }}
          required
        />
        <Button
          variant="contained"
          endIcon={<AddBoxIcon />}
          type="submit"
          sx={{
            ml: 1,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            ':hover': { backgroundColor: 'primary.light' },
          }}
        >
          {formData.id ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddForm;
