import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

  function App() {
    const [book , setBook] = useState("")
    const[allBooks, setAllBooks] = useState([])
    useEffect(() =>{
      getAllBooks();
    }, []);

    const addClick= () => {
      axios.post('http://localhost:5001/AddBook', {book: book})
      .then(result =>  console.log("Book Added",result))
      .catch(err => console.log(err))
      getAllBooks();
    }

    const getAllBooks = () => {
      axios.get('http://localhost:5001/GetBook')
      .then((result) => setAllBooks(result.data))
      .catch(err => console.log(err))
    }

    const DeleteBook = (id) => {
      axios.delete('http://localhost:5001/DeleteBook/' + id)
      .then((result) => {
        setAllBooks(result.data)
      })
      .catch(err => console.log(err))
     
    }

    
return(
  
  <div className="AddBook_Container">
  <h1>Book App</h1>
  <input type="text" placeholder="Enter Book Title" onChange={(e) => setBook(e.target.value)}/>
  <button type="button" onClick={addClick}>Add Book</button>

  <div className="GetAllBooks_Container">
  <h2>All Book</h2>
  {
    allBooks.map((book) => (
      <div key={book._id}>
      <p>{book.book}</p>
      <button type="button" onClick={() => DeleteBook(book._id)}>Delete Book</button>
      </div>
))}
  <div>

  
  </div>
  </div>
  </div>

)
}

export default App;
