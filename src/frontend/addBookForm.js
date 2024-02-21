import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genere: '',
    date: 0,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showRequestError, setRequestError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      formData.title &&
      formData.author &&
      formData.genere &&
      formData.date
    ) {
      
      //console.log(formData);

      Axios.post('http://localhost:3010/books/addBook', {
        title:formData.title,
        author:formData.author,
        genere:formData.genere,
        date:formData.date,
    }).then((response) => {
        if(response.data.message){
            console.log(response.data.message);
           console.log("error occured");
           setRequestError(true);
        }
        else{
            setShowSuccessAlert(true);
        }
    });

      // Show success alert
      //setShowSuccessAlert(true);

      // Clear the form
      setFormData({
        title: '',
        author: '',
        genere: '',
        date: 0,
      });
    } else {
      // Show error alert
      setShowErrorAlert(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Employee Details
      </Typography>
      <form>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Genre"
          name="genere"
          value={formData.genere}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Thriller">Thriller</MenuItem>
          <MenuItem value="Science Fiction">Science Fiction</MenuItem>
          <MenuItem value="Fantasy">Fantasy</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Humor">Humor</MenuItem>
          
        </TextField>
        
        <TextField
          label="Published Year"
          name="date"
          type="number"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
          Submit
        </Button>
      </form>
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Book Added successfully!
        </Alert>
      )}
      {showRequestError && (
        <Alert severity="error" onClose={() => setRequestError(false)}>
          Something went wrong! submition unsuccessfull!
        </Alert>
      )}
      {showErrorAlert && (
        <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
          Please fill in all required fields.
        </Alert>
      )}
    </div>
    </div>
  );
};

export default AddBookForm;
