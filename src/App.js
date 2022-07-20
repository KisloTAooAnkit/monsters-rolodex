import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/searchBox/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchVal = event.target.value.toLowerCase();

    this.setState(() => {
      return { searchString: searchVal };
    });
  };

  render() {
    console.log("App rendering");
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(this.state.searchString);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={this.onSearchChange}
          placeholder="search Monsters"
          className="monster-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
