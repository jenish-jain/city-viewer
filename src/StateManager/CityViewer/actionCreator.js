import { UPDATE_STATE, UPDATE_CITIES } from "./actionTypes";

export function updateState(selection) {
  return { type: UPDATE_STATE, payload: selection };
}

export function updateCities(cities) {
  return { type: UPDATE_CITIES, payload: cities };
}
