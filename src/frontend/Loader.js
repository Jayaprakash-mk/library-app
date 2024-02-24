import React from 'react';
import { CircularProgress, styled } from '@mui/material';

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'fixed', // Fixed position to cover the entire viewport
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(255, 255, 255, 0.8)',
});

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress style={{ color: '#333' }} />
    </LoaderContainer>
  );
};

export default Loader;