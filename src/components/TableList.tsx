import { useEffect, useState } from 'react';
import { useAppDispatch, todosSelector } from '../app/hooks';
import { fetchTodos, removeTodoAsync } from '../features/todos/todosSlice';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';
import { Todo } from '../types/types';

export default function TableList() {
  //states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [rows, setRows] = useState<Todo[]>([]);
  //select store states
  const todos = todosSelector();
  // create dispatch
  const dispatch = useAppDispatch();
  // create navigator
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    setRows(todos);
    setIsLoading(false);
  }, [todos]);

  const handleOnDelete = (id: string) => {
    toast.promise(
      dispatch(removeTodoAsync(id))
        .unwrap()
        .then(() => dispatch(fetchTodos())),
      {
        loading: 'Deleting...',
        success: <b>Todo Deleted</b>,
        error: <b>Failed to Delete</b>,
      },
    );
  };

  const handleOnEdit = (todo: Todo) => {
    setTodoToEdit({ ...todo });
    navigate('/add', { state: { todoToEdit: todo } });
  };

  const handleOnView = (id: string) => {
    navigate(`/todos/${id}`);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: isLoading ? '' : '15px',
        border: isLoading ? 0 : 1,
        color: isLoading ? '' : 'primary.contrastText',
      }}
    >
      {isLoading ? (
        <Box sx={{ bgcolor: 'primary.background' }}>
          <Skeleton sx={{ bgcolor: 'primary.dark' }} />
          <Skeleton sx={{ bgcolor: 'primary.dark' }} />
          <Skeleton sx={{ bgcolor: 'primary.dark' }} />
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  View
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  Edit
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: 'primary.background',
                    '& td': { color: 'primary.contrastText' },
                    '&:hover': { backgroundColor: 'primary.light' },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>

                  <TableCell
                    align="center"
                    onClick={() => handleOnView(row.id)}
                  >
                    <VisibilityIcon sx={{ fontSize: 18, color: '#fff ' }} />
                  </TableCell>
                  <TableCell align="center" onClick={() => handleOnEdit(row)}>
                    <EditIcon sx={{ fontSize: 18, color: '#4fc3f7' }} />
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleOnDelete(row.id)}
                  >
                    <DeleteIcon sx={{ fontSize: 18, color: '#f44336' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
