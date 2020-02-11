import React, { Component } from "react";
import { stateArray } from "../StateList";
import { connect } from "react-redux";
import {
  updateState,
  updateCities
} from "../../StateManager/CityViewer/actionCreator";
// import { Dropdown } from "react-bootstrap";

class StateSelector extends Component {
  fetchCities = async selectedState => {
    return fetch(
      `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${selectedState}`
    );
  };

  handleChange = async event => {
    let selection = event.target.value;
    this.props.updateState(selection);
    try {
      const data = await this.fetchCities(selection);
      const json = await data.json();
      console.log(json);
      this.props.updateCities(json);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {/* <Dropdown
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
        </Dropdown> */}
        <select value="select State" onChange={this.handleChange}>
          {stateArray.map(state => (
            <option key={state} value={state}>
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
    selectedState: state.selectedState
    // cities: state.cityViewer.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: selection => {
      dispatch(updateState(selection));
    },
    updateCities: cities => {
      dispatch(updateCities(cities));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateSelector);
