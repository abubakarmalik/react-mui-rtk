import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AppLayout;
