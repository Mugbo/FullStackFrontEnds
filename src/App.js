import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  API_URL = "http://http://localhost:3000/";

  componentDidMount() {
    this.refreshBooks();
  }

  async refreshBooks() {
    fetch(this.API_URL + "api/bookapp/GetBook")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data });
      });
  }

  async addClick() {
    var newBook = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newBook", newBook);

    fetch(this.API_URL+"api/bookapp/AddBook", {
      method:"POST",
      body:data
    }).then(res=>res.json())
    .then((result) => {
      alert(result);
      this.refreshBook();
    })
  }

  async deteleClick(id) { 

    fetch(this.API_URL+"fullstackproject/bookapp/DeleteBook?id="+id, {
      method:"DELETE",
    }).then(res=>res.json())
    .then((result) => {
      alert(result);
      this.refreshBook();
    })
  }
  
  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <h2> Todo App</h2>
        <input id="newBook" />
        &nbsp;
        <button onClick={() => this.addClick()}>Add Notes</button>
        {notes.map((note) => (
          <p>
            <b> * {note.desciption}</b>
            <button onClick={() => this.deleteClick(note.id)}>
              delete Book
            </button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;
