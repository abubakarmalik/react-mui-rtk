import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import AddTodo from '../pages/AddTodo';
import DetailsTodo from '../pages/DetailsTodo';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="todos" element={<Todos />} />
      <Route path="todos/:id" element={<DetailsTodo />} />
      <Route path="add" element={<AddTodo />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>,
  ),
);
