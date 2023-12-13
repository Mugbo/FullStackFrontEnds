// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [book, setBook] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const addClick = () => {
    axios
      .post("http://localhost:5001/AddBook", { book: book })
      .then((result) => console.log("Book Added", result))
      .catch((err) => console.log(err));
    getAllBooks();
  };

  const getAllBooks = () => {
    axios
      .get("http://localhost:5001/GetBook")
      .then((result) => setAllBooks(result.data))
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
        {allBooks.map((book) => (
          <div key={book._id} className="book-item">
            <p className="book-title">{book.book}</p>
            <button
              type="button"
              className="delete-button"
              onClick={() => deleteBook(book._id)}
            >
              Delete Book
            </button>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}

export default App;
