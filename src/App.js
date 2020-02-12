import React from "react";
import "./App.css";
import StateSelector from "./components/StateSelector";
import CityList from "./components/CityList";
import Map from "./components/Map";
function App() {
  return (
    <div className="App">
      <span>Select a state from dropdown</span>
      <StateSelector />
      <div className="row">
        <CityList />
        <Map />
      </div>
    </div>
  );
}

export default App;

//"bootstrap": "^4.4.1",
