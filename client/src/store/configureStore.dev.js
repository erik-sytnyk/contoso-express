import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(thunk)));

  return store;
};

export default configureStore;
