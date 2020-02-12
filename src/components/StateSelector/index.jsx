import React, { Component } from "react";
import { stateArray } from "../StateList";
import { connect } from "react-redux";
import {
  updateState,
  updateCities,
  updateCitiesLocation,
  setZoomLevel,
  setMapCenter
} from "../../StateManager/CityViewer/actionCreator";

let locationArray = [];

class StateSelector extends Component {
  fetchCities = async selectedState => {
    return fetch(
      `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${selectedState}`
    );
  };

  fetchState = async state => {
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${state},India&key=AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs`
    );
    const json = await data.json();
    console.log(json);
    const location = json.results[0].geometry.location;
    // console.log(location, "location of state");
    this.props.setMapCenter(location);
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
    locationArray = [];
    let selection = event.target.value;
    this.props.updateState(selection);
    await this.fetchState(selection);
    this.props.setZoomLevel(7);

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
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="dropdown m-2">
        <select
          value="select State"
          onChange={this.handleChange}
          className="btn btn-primary dropdown-toggle"
        >
          <option value="state">States</option>
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
    },
    setMapCenter: center => {
      dispatch(setMapCenter(center));
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
