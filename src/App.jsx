import React from 'react';
import PokemonList from './components/PokemonList';
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Container>
      <Typography variant="h2" component="div" gutterBottom>
        Pokemon App
      </Typography>
      <PokemonList />
    </Container>
  );
};

export default App;
