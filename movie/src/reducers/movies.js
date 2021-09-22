import produce from "immer";

// 👉 초기상태 정의
const initialState = {
  movies: [],

  loadMovieLoading: false,
  loadMovieDone: false,
  loadMovieError: null,
};

// 화면 로딩 👉 타입정의
export const LOAD_MOVIES_REQUEST = "LOAD_MOVIES_REQUEST";
export const LOAD_MOVIES_SUCCESS = "LOAD_MOVIES_SUCCESS";
export const LOAD_MOVIES_FAILURE = "LOAD_MOVIES_FAILURE";

// 첫 번째 인수 현재 상태 (즉, 초기상태)
// 두 번째 인수 액션이 일어나야 될 상태 (dispatch)
// 👉 리듀서
const movies = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MOVIES_REQUEST: {
        draft.loadMovieLoading = true;
          draft.loadMovieDone = false;
        break;
      }
      case LOAD_MOVIES_SUCCESS: {
        draft.movies = draft.movies.concat(action.data);
        draft.loadMovieLoading = false;
        draft.loadMovieDone = true;
        break;
      }
      case LOAD_MOVIES_FAILURE: {
        draft.loadMovieError = action.error;
        break;
      }

      default:
        return state;
    }
  });

  export default movies;