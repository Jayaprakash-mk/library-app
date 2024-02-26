import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Pagination, Typography, Box, Container, Grid, Paper, styled} from '@mui/material';
import { Button } from '@mui/material';
import BookFilter from './BookFilter.js';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import classes from "./css/HomePage.module.css";
import Loader from './Loader';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#333', // Dark grey-black background color
    color: theme.palette.text.primary, // Text color
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    height: '100%', // Ensures all boxes have the same height
    marginBottom: theme.spacing(2), // Adds spacing between each row of boxes
  }));

const titleTextStyle = {
    color: '#FFD700', // Golden yellow text color
    fontWeight: 'bold', // Bold font weight
};
  
const bodyTextStyle = {
    color: '#ffffff', // White text color
    fontWeight: 'normal', // Normal font weight
};

const AddBookButton = styled(Button)({
    marginLeft: '8px',
});


const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genere: '',
    date: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const backToHomeButton = () => {
    props.choice2(false);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get(`https://considerable-harlie-jayaprakashmk.koyeb.app/books?page=${currentPage}`, {
          params: filters,
        });
        console.log(response.data.books)
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching books', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, filters]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  

  return (
    <Container>
      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          Library Management
          <div className={classes.backButton}>
              <CancelOutlinedIcon sx={{fontSize: 32}} onClick={backToHomeButton}/>
          </div>
        </Typography>
        <BookFilter filters={filters} onFilterChange={handleFilterChange} />
      </Box>
      <Grid container spacing={6}>
        {isLoading ? (<Loader />
        ) : ( 
          books && books.length > 0 ? (
           books.map((book) => (
            <Grid item xs={12} sm={4} key={book.id}>

              <StyledPaper>
                <Typography variant="h6" style={titleTextStyle}>Book Title: {book.title}</Typography>
                <Typography variant="body1" style={bodyTextStyle}>Author: {book.author}</Typography>
                <Typography variant="body1" style={bodyTextStyle}>Genre: {book.genere}</Typography>
                <Typography variant="body1" style={bodyTextStyle}>Published Date: {book.date}</Typography>
                
              </StyledPaper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={bodyTextStyle}>No books found.</Typography>
        )
      )}
      </Grid>
      {(!isLoading && (books && books.length > 0)) && (
        <Grid container justifyContent="center" style={{ marginTop: '48px' }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Grid>
      )}
      {/* <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
        <AddBookButton variant="contained" onClick={handleAddBookClick}>
          Add Book
        </AddBookButton>
      </Grid> */}
    </Container>
  );
};

export default BookList;
