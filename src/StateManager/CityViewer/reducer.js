import { UPDATE_STATE, UPDATE_CITIES } from "./actionTypes";

const initialState = {
  selectedState: "",
  cities: [{ City: "Aadityana", State: "Gujarat", District: "Porbandar" }]
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
    default:
      return state;
  }
}

export default cityViewer;
