import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectTodos } from '../features/todos/todosSlice';
import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';

export default function DetailsCard() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState({});
  const todos = useSelector(selectTodos);
  const navigate = useNavigate();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === id);
    setTodo(todo);
    if (todo) {
      setIsLoading(false);
    }
  }, [todo]);

  const handleOnClick = () => {
    navigate('/todos');
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: 'primary.background',
        color: 'primary.contrastText',
        border: isLoading ? 0 : 1,
        borderRadius: isLoading ? '' : '10px',
        pl: 2,
      }}
    >
      {isLoading ? (
        <Box sx={{ bgcolor: 'primary.background' }}>
          <Skeleton variant="text" sx={{ bgcolor: 'primary.dark', mb: 1 }} />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: 'primary.dark', mb: 1 }}
          />
          <Skeleton variant="rectangular" sx={{ bgcolor: 'primary.dark' }} />
        </Box>
      ) : (
        <>
          <CardContent>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              {id}
            </Typography>
            <Typography variant="h5" component="div">
              {todo?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{todo?.email}</Typography>
            <Typography variant="body2">
              {todo?.phone}
              <br />
              {todo?.address}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" type="button" onClick={handleOnClick}>
              Go Back
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
