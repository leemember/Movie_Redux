# 🎞 리액트와 Redux를 이용한 영화 차트

## 🔍 **결과물 미리보기**

![](https://images.velog.io/images/leemember/post/85be7c81-8351-47e1-a664-fa8ba862314d/%E1%84%85%E1%85%B5%E1%84%83%E1%85%A5%E1%86%A8%E1%84%89%E1%85%B3.gif)

<br>

## 💻 **리덕스 구현한 코드 미리보기**

- [`설명 자세히 보기`](./movie/README.md)

```
import produce from "immer";

👉 초기상태 정의
const initialState = {
  movies: [],

  loadMovieLoading: false,
  loadMovieDone: false,
  loadMovieError: null,
};

👉 타입정의 (화면 로딩용)
export const LOAD_MOVIES_REQUEST = "LOAD_MOVIES_REQUEST";
export const LOAD_MOVIES_SUCCESS = "LOAD_MOVIES_SUCCESS";
export const LOAD_MOVIES_FAILURE = "LOAD_MOVIES_FAILURE";

👉 리듀서
const movies = (state = initialState, action) =>
//⭐️ 첫 번째 인수 현재 상태 (즉, 초기상태)
//⭐️ 두 번째 인수 액션이 일어나야 될 상태 (바뀔 상태)

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
```

## 📚 **도움 된 자료**

> 🔗 https://kyounghwan01.github.io/blog/React/redux/redux-basic/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2 <br /> 🔗 https://react.vlpt.us/redux/ <br /> 🔗 인프런 제로초님 노드버드
