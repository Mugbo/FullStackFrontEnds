import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import Wrapper from "./components/Wrapper";
import { Button } from "./components/ui/Button";

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

  const DeleteBook = (id) => {
    axios
      .delete("http://localhost:5001/DeleteBook/" + id)
      .then((result) => {
        setAllBooks(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Wrapper>
        <div>
          <div className="py-20 mx-auto text-centre flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-black-900">
            {""}
            <span className="text-red-600">Welcome to the e-lib</span>
          </h1>
            <input
              type="text"
              placeholder="Enter Book Title"
              onChange={(e) => setBook(e.target.value)}
            />
            <Button onClick={addClick}>Add Book &rarr;</Button>
            <button type="button" onClick={addClick}>
              Add Book
            </button>
          </div>
          <div className="GetAllBooks_Container">
            <h2>All Book</h2>
            {allBooks.map((book) => (
              <div key={book._id}>
                <p>{book.book}</p>
                <button type="button" onClick={() => DeleteBook(book._id)}>
                  Delete Book
                </button>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default App;
