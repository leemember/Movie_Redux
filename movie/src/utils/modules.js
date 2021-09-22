import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import moviesSaga from "../sagas/movies";
import moviesReducer from "../reducers/movies";

const rootReducer = combineReducers({
  moviesReducer,
});

export function* rootSaga() {
  yield all([fork(moviesSaga)]);
}

export default rootReducer;
