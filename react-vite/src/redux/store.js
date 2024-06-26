import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import userReducer from "./users";
import categoriesReducer from "./categories";
import companiesReducer from "./companies";
import imagesReducer from "./images.js";
import reviewsReducer from "./reviews";
import searchReducer from "./search.js";
import mapsReducer from "./maps.js"

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  categories: categoriesReducer,
  companies: companiesReducer,
  images: imagesReducer,
  reviews: reviewsReducer,
  search: searchReducer,
  maps: mapsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
