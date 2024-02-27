import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import classes from "./css/HomePage.module.css";

const AddBookForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genere: '',
    date: 0,
    onlinePurchaseLink: '',
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showRequestError, setRequestError] = useState(false);
  const [showInvalidDate, setInvalidDate] = useState(false);
  const [showInvalidLink, setInvalidLink] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      if (parseInt(value, 10) > 2024) {
        setInvalidDate(true);
        return;
      }
      else{
        setInvalidDate(false);
      }
    }

    // if(name === 'onlinePurchaseLink'){
    //   const isValidLinkFormat = /^(ftp|http|https):\/\/[^ "]+$/.test(value);

    //   if (value && !isValidLinkFormat) {
    //       //return res.status(200).json({ message: "Invalid URL format for onlinePurchaseLink" });
    //       setInvalidLink(true);
    //       return;
    //   }
    //   else{
    //     setInvalidLink(false);
    //   }
      
      // if(value){
      //   try {
      //     const response = Axios.head(value);
      //       if (response.status !== 200) {
      //         //return res.status(200).json({ message: "Online purchase link is not reachable" });
      //         setInvalidLink(true);
      //         return;
      //       }
      //     } catch (error) {
      //       //return res.status(200).json({ message: "Error checking link reachability", cause: error.message });
      //       setInvalidLink(true);
      //       return;
      //     }
      // }
    //}

    // Update the form data
    setFormData({ ...formData, [name]: value });
  };


  const backToHomeButton = () => {
    props.choice1(false);
  }

  const handleSubmit = () => {
    if (
      formData.title &&
      formData.author &&
      formData.genere &&
      formData.date
    ) {
      
      //console.log(formData);

      Axios.post('https://considerable-harlie-jayaprakashmk.koyeb.app/books/addBook', {
        title:formData.title,
        author:formData.author,
        genere:formData.genere,
        date:formData.date,
        onlinePurchaseLink: formData.onlinePurchaseLink,
    }).then((response) => {
        if(response.data.message === "Error in DNS"){
            console.log(response.data.message);
            setInvalidLink(true);
            return;
            // console.log("error occured");
           //setRequestError(true);
            //setShowSuccessAlert(true);
        }
        else{
            setShowSuccessAlert(true);
            setFormData({
              title: '',
              author: '',
              genere: '',
              date: 0,
              onlinePurchaseLink: '',
            });
        }
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
        Add New Book
        <div className={classes.backButton}>
              <CancelOutlinedIcon sx={{fontSize: 32}} onClick={backToHomeButton}/>
        </div>
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

        <TextField
            label="Online Purchase Link (optional)"
            name="onlinePurchaseLink"
            value={formData.onlinePurchaseLink}
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
      {showInvalidDate && (
        <Alert severity="error" onClose={() => setInvalidDate(false)}>
          Invalid year in Published year field!!!
        </Alert>
      )}

      {showInvalidLink && (
        <Alert severity="error" onClose={() => setInvalidLink(false)}>
          Invalid URL format for onlinePurchaseLink
        </Alert>
      )}
    </div>
    </div>
  );
};

export default AddBookForm;
