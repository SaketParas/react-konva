import React, { Component } from 'react';
import './App.css';
import KonvaCanvas from "./components/KonvaCanvas";

const ThemeContext = React.createContext("blue");

class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value="blue">
        <KonvaCanvas />
      </ThemeContext.Provider>
    );
  }
}
export default App;
