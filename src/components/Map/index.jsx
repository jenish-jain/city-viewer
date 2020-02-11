import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";

const Pointer = ({ text }) => <div>{text}</div>;

class Map extends Component {
  fetchLocation = async city => {
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city.City},${city.State}&key=AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs`
    );
    const json = await data.json();
    const location = json.results[0].geometry.location;
    // this.setState({ location: location }); // inifinte loop
    console.log(location);
  };

  render() {
    this.fetchLocation(this.props.cities[0]);
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs" }}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33
          }}
          defaultZoom={11}
        >
          <Pointer lat={59.955413} lng={30.337844} text="My Marker" />
          <Pointer lat={21.7164149} lng={69.68997} text="jenish" />
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};
export default connect(mapStateToProps)(Map);
