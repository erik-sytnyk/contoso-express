const redux = require('redux');
const thunk = require('redux-thunk');
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return redux.createStore(
    rootReducer,
    initialState,
    redux.applyMiddleware(thunk.default)
  );
}
