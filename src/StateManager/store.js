import { createStore } from "redux";

import cityViewer from "./CityViewer/reducer";

const store = createStore(cityViewer);

export default store;
