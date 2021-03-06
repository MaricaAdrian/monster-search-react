import { Component } from "react";
import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
      title: ''
    };
  }

  _handleChange = (e, keyState) => {
    const newTitle = `Monster Rolodex - ${e.target.value}`;
    this.setState({ [keyState]: e.target.value, title: newTitle });
  };

  get handleChange() {
    return this._handleChange;
  }
  set handleChange(value) {
    this._handleChange = value;
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monster search</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={(e) => this.handleChange(e, "searchField")}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
