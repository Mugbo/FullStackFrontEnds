import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
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
    var newBook = document.getElementById("newBook").value;
    const data = new FormData();
    data.append("newBook", newBook);

    fetch(this.API_URL + "api/bookapp/AddBook", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshBook();
      });
  }

  async deteleClick(id) {
    fetch(this.API_URL + "fullstackproject/bookapp/DeleteBook?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshBook();
      });
  }

  render() {
    const { book } = this.state;
    return (
      <div className="App">
        <h2> Todo App</h2>
        <input id="newBook" />
        &nbsp;
        <button onClick={() => this.addClick()}>Add book</button>
        {book.map((book) => (
          <p>
            <b>* {book.desciption}</b>&nbsp;
            <button onClick={() => this.deleteClick(book.id)}>
              delete Book
            </button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;
