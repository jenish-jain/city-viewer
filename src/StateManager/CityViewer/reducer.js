import {
  UPDATE_STATE,
  UPDATE_CITIES,
  UPDATE_CITIES_LOCATION,
  SET_ZOOM_LEVEL,
  SET_MAP_CENTER,
  SET_LOADING_STATUS
} from "./actionTypes";

const initialState = {
  selectedState: "",
  mapCenter: { lat: 28.7040592, lng: 77.10249019999999 }, // delhi coordinate
  cities: [],
  cityLocations: [],
  zoomLevel: 5,
  isLoading: false
};

function cityViewer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATE:
      return Object.assign({}, state, {
        selectedState: action.payload
      });
    case UPDATE_CITIES:
      return Object.assign({}, state, {
        cities: action.payload
      });
    case UPDATE_CITIES_LOCATION:
      return Object.assign({}, state, {
        cityLocations: action.payload
      });
    case SET_ZOOM_LEVEL:
      return Object.assign({}, state, {
        zoomLevel: action.payload
      });
    case SET_MAP_CENTER:
      return Object.assign({}, state, {
        mapCenter: action.payload
      });
    case SET_LOADING_STATUS:
      return Object.assign({}, state, {
        isLoading: action.payload
      });
    default:
      return state;
  }
}

export default cityViewer;
