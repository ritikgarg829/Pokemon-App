import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Grid, TextField } from '@mui/material';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
                const results = response.data.results;

                const detailedPokemonData = await Promise.all(
                    results.map(async (pokemon) => {
                        const pokemonDetails = await axios.get(pokemon.url);
                        return pokemonDetails.data;
                    })
                );

                setPokemonData(detailedPokemonData);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchPokemon();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredPokemon = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Search Pokemon"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearchChange}
            />
            <Grid container spacing={2}>
                {filteredPokemon.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PokemonList;
