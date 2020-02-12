import {
  UPDATE_STATE,
  UPDATE_CITIES,
  UPDATE_CITIES_LOCATION,
  SET_ZOOM_LEVEL,
  SET_MAP_CENTER
} from "./actionTypes";

export function updateState(selection) {
  return { type: UPDATE_STATE, payload: selection };
}

export function updateCities(cities) {
  return { type: UPDATE_CITIES, payload: cities };
}

export function updateCitiesLocation(locationArray) {
  return { type: UPDATE_CITIES_LOCATION, payload: locationArray };
}

export function setZoomLevel(level) {
  return { type: SET_ZOOM_LEVEL, payload: level };
}

export function setMapCenter(center) {
  return { type: SET_MAP_CENTER, payload: center };
}
