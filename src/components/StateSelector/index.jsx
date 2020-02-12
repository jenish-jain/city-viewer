import React, { Component } from "react";
import { stateArray } from "../StateList";
import { connect } from "react-redux";
import {
  updateState,
  updateCities,
  updateCitiesLocation,
  setZoomLevel
} from "../../StateManager/CityViewer/actionCreator";
// import { Dropdown } from "react-bootstrap";

let locationArray = [];

class StateSelector extends Component {
  fetchCities = async selectedState => {
    return fetch(
      `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${selectedState}`
    );
  };

  fetchLocation = async city => {
    if (city === undefined) {
      console.log(city.City, "undefined");
      return;
    }
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city.City},${city.State}&key=AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs`
    );
    const json = await data.json();
    console.log(json);
    const location = json.results[0].geometry.location;
    // this.setState({ location: location }); // inifinte loop
    console.log(location);
    locationArray.push({
      name: city.City,
      location: location
    });
  };

  handleChange = async event => {
    let selection = event.target.value;
    this.props.updateState(selection);
    try {
      const cityData = await this.fetchCities(selection);
      const citiesJSON = await cityData.json();
      console.log(citiesJSON);
      this.props.updateCities(citiesJSON);
      let count = 20;
      // await citiesJSON.forEach(async city => {
      //   const cityLocation = await this.fetchLocation(city);
      //   console.log(cityLocation);
      // });
      for (let i = 0; i < count; i++) {
        await this.fetchLocation(citiesJSON[i]);
      }
      console.log(locationArray);
      this.props.updateCitiesLocation(locationArray);
      console.log(this.props.cityLocations);
      this.props.setZoomLevel(11);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="dropdown">
        <select
          value="select State"
          onChange={this.handleChange}
          className="btn btn-primary dropdown-toggle"
        >
          {stateArray.map(state => (
            <option key={state} value={state} className="dropdown-item">
              {state}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedState: state.selectedState,
    cities: state.cities,
    cityLocations: state.cityLocations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: selection => {
      dispatch(updateState(selection));
    },
    updateCities: cities => {
      dispatch(updateCities(cities));
    },
    updateCitiesLocation: locationArray => {
      dispatch(updateCitiesLocation(locationArray));
    },
    setZoomLevel: level => {
      dispatch(setZoomLevel(level));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateSelector);

/* <Dropdown
          onSelect={function(evt, eventKey) {
            console.log(eventKey.);
          }}
        >
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            States
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {stateArray.map(state => (
              <Dropdown.Item key={state} href="#" value={state}>
                {state}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */
