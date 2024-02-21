import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const BookFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    onFilterChange(localFilters);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          label="Title"
          name="title"
          value={localFilters.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Author"
          name="author"
          value={localFilters.author}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Genre"
          name="genere"
          value={localFilters.genere}
          onChange={handleChange}
        />
      </Grid>
      
      
      <Grid item>
        <Button variant="contained" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default BookFilter;
