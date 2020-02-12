import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Pointer from "../Pointer";
import "./style.css";
class Map extends Component {
  render() {
    return (
      <div
        style={{ height: "90vh", width: "100%" }}
        className="col-12 col-md-12 col-lg-6 border"
      >
        {this.props.isLoading ? (
          <Loader
            className="loader"
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
          />
        ) : null}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs" }}
          center={{
            lat: this.props.mapCenter.lat,
            lng: this.props.mapCenter.lng
          }}
          zoom={this.props.zoomLevel}
        >
          {this.props.cityLocations != null
            ? this.props.cityLocations.map(loc => (
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
    cityLocations: state.cityLocations,
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(Map);
