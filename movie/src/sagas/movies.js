import axios from "axios";
import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";

import {
  LOAD_MOVIES_REQUEST,
  LOAD_MOVIES_SUCCESS,
  LOAD_MOVIES_FAILURE,
} from "../reducers/movies";

function loadMoviesAPI() {
  return axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
}

function* loadMainPosts() {
  try {
    console.log("saga Movies");
    const result = yield call(loadMoviesAPI);
    yield delay(1000);

    yield put({
      type: LOAD_MOVIES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MOVIES_REQUEST, loadMainPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadMainPosts)]);
}

/*
  📍 fork : 함수호출(비동기)
  📍 call : 함수호출(동기)
  📍 put : 액션 dispatch
  📍 takeLatest : 액션이 dispatch되는 것을 기다려서 dispatch될때 generator를 호출 (맨 뒤에꺼만)
  📍 takeEvery : 액션이 dispatch되는 것을 기다려서 dispatch될때 generator를 호출 (전부)
*/
