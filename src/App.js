
import './App.css';
import React, {useState}from "react";
import AddBookForm from './frontend/addBookForm.js';
import HomePage from './frontend/HomePage.js';
import BookList from './frontend/BookList';


function App() {
  const [Add, AddNewData] = useState(false);
  const [View, ViewNewData] = useState(false);

  const AddData = (okay) => {
    AddNewData(okay);
  }
  const ViewData = (okay) => {
    ViewNewData(okay);
  }

  return (
    <>
      {!Add && !View && <HomePage choice1={AddData} choice2={ViewData}/>}
      {Add && !View && <AddBookForm/>}
      {View && !Add && <BookList/>}
    </>
  );
}

export default App;
