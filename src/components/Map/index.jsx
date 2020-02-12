import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
// const Pointer = ({ text }) => (
//   <div>
//     <h6>{text}</h6>
//   </div>
// );
import Pointer from "../Pointer";

class Map extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.cityLocations !== this.props.cityLocations) {
      console.log("not changed");
    }
  }
  render() {
    // this.fetchLocation(this.props.cities[0]);

    return (
      <div
        style={{ height: "100vh", width: "100%" }}
        className="col col-md-12 col-lg-6"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs" }}
          defaultCenter={{
            lat: this.props.mapCenter.lat,
            lng: this.props.mapCenter.lng
          }}
          defaultZoom={this.props.zoomLevel}
        >
          {/* <Pointer lat={59.955413} lng={30.337844} text="My Marker" />
          <Pointer lat={21.7164149} lng={69.68997} text="jenish" /> */}
          {this.props.cityLocations != null
            ? this.props.cityLocations.map(loc => (
                // console.log(loc, "from map object")

                <Pointer
                  key={loc.name}
                  id={loc.name}
                  lat={loc.location.lat}
                  lng={loc.location.lng}
                  name={loc.name}
                  color="blue"
                />
              ))
            : console.log("empty till now")}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    zoomLevel: state.zoomLevel,
    mapCenter: state.mapCenter,
    cityLocations: state.cityLocations
  };
};

export default connect(mapStateToProps)(Map);
