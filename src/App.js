// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [book, setBook] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/GetBook")
      .then((result) => setAllBooks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const addClick = () => {
    axios
      .post("http://localhost:5001/AddBook", { book: book })
      .then((result) => console.log("Book Added", result))
      .catch((err) => console.log(err));
  };

  const deleteBook = (id) => {
    axios
      .delete("http://localhost:5001/DeleteBook/" + id)
      .then((result) => {
        setAllBooks(result.data);
      })
      .catch((err) => console.log(err));
  };

  const UpdateBook = (id) => {
    axios
      .put("http://localhost:5001/UpdateBook/" + id)
      .then((result) => {
        console.log(result);
        // Add logic to handle the update response if needed
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-container">
      <div className="welcome-container">
        <h1 className="welcome-text">Welcome to the e-lib</h1>
        <input
          type="text"
          className="input-box"
          placeholder="Enter Book Title"
          onChange={(e) => setBook(e.target.value)}
        />
        <button type="button" className="add-button" onClick={addClick}>
          Add Book
        </button>
      </div>
      <div className="all-books-container">
        <h2 className="all-books-heading">All Books</h2>
        {allBooks.length === 0 ? (
          <div>No records</div>
        ) : (
          allBooks.map((book) => (
            <div className="task" key={book._id}>
              <div className="checkbox" onClick={() => UpdateBook(book._id)}>
                <div className="book-item">
                  <p className="book-title">{book.book}</p>
                </div>
              </div>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteBook(book._id)}
              >
                Delete Book
              </button>
            </div>
          ))
        )}

        {/* This empty div seems unnecessary */}
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default App;
