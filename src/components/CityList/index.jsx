import React, { Component } from "react";
import { connect } from "react-redux";

class CityList extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div>
        {cities.map((city, index) => (
          <div key={index}>{city.City}</div>
        ))}
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
