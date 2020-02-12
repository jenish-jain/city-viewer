import React, { Component } from "react";
import { connect } from "react-redux";

class CityList extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div className="col col-md-12 col-lg-6">
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
    cities: state.cities
  };
};
export default connect(mapStateToProps)(CityList);
