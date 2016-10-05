import rootReducer from '../reducers';
const redux = require('redux');
const reduxImmutableStateInvariant = require('redux-immutable-state-invariant');
const thunk = require('redux-thunk');

export default function configureStore(initialState) {
    return redux.createStore(
        rootReducer,
        initialState,
        redux.compose(
            redux.applyMiddleware(thunk.default, reduxImmutableStateInvariant()),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
