import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userReducer } from "./reducers/UserReducer"
import {productReducer} from "./reducers/productReducer"



let initialState = {
  

};


const reducer = combineReducers({
      
       userReducer,
       productReducer
});






const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
