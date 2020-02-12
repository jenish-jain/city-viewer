import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
class CityList extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div className="col col-md-12 col-lg-6 city-list">
        <div className="selected-state">
          {this.props.selectedState
            ? this.props.selectedState
            : "Selected State will appear here"}
        </div>
        <ul className="list-group">
          {cities.map((city, index) => (
            <li className="list-group-item" key={index}>
              {city.City}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    selectedState: state.selectedState
  };
};
export default connect(mapStateToProps)(CityList);
