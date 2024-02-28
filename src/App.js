
import './App.css';
import React, {useState}from "react";
import AddBookForm from './frontend/addBookForm.js';
import HomePage from './frontend/HomePage.js';
import BookList from './frontend/BookList';
import AdminLogin from './frontend/AdminLogin';


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
      {!Add && !View && <AdminLogin choice1={AddData} choice2={ViewData}/>}
      {Add && !View && <AddBookForm choice1={AddData}/>}
      {View && !Add && <BookList choice2={ViewData}/>}
    </>
  );
}

export default App;
