import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootreducers from "./redux/reducer/rootreducers";

const Store = createStore(
    rootreducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default Store;