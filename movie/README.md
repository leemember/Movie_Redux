# 🎞 React + Redux + Movie API Axios

> 노마드코더 Movie API axios로 불러와서 리덕스로 상태관리하기.

<br />

## 1. 데이터 불러오기 - [App.js]

```
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import List from "./Components/List";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
      .then((res) => setMovies(res.data.data.movies));
  }, []);

  console.log(movies);

  return (
    <main className="App">
      <Title>😎 현주의 영화 차트 🍿</Title>
      <GlobalStyle />

      <Container>
        {movies.map((movie, index) => (
          <List
            key={index}
            id={movie.id}
            title={movie.title}
            medium_cover_image={movie.medium_cover_image}
            summary={movie.summary}
            rating={movie.rating}
          />
        ))}
      </Container>
    </main>
  );
}

export default App;
```

위 코드에서 데이터를 가져올 때 어떤 데이터를 가져와야 될 지 모른다면

```
  useEffect(() => {
    axios
      .get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
      .then((res) => setMovies👉(res.data));
  }, []);

  console.log(movies);
```

이렇게 👉 (res.data)); 만 입력하면 아래 사진 처럼 나온다.

![](https://images.velog.io/images/leemember/post/ea8236c9-145f-47da-8cdd-1d13c2c7771e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.33.11.png)

그럼 data에 어떤 프로퍼티에 접근해야 되는지 확인 할 수 있으며 콘솔창에 찍힌 값들을 보면 data의 movies 정보를 가져오면 되는구나 라고 알 수 있다. 그래서 `(res.data.data.movies)` 이렇게 데이터의 movies 프로퍼티에 마침표 표기법으로 불러갖고 오면 된다. 👉 무엇이 문제일지 모를 땐 콘솔로그를 생활화하자 !

![](https://images.velog.io/images/leemember/post/f22d8d16-33ef-4772-9b53-d7eaa00cf5ab/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.37.08.png)

데이터 불러오기 성공적. 그럼 이제 리덕스를 사용하여 상태관리를 진행해보자.

<br />

## 2. 리덕스로 상태관리

> 참고 👉 https://ko.redux.js.org/tutorials/quick-start

`Redux는 "액션"이라는 이벤트를 사용`하여 애플리케이션 상태를 관리하고 업데이트하기 위한 패턴 및 라이브러리이며, Redux는 애플리케이션의 많은 부분에 필요한 "전역" 상태를 관리하는 데 도움이 됩니다.

이는 상태가 예측 가능한 방식으로만 업데이트될 수 있도록 보장하는 규칙과 함께 전체 애플리케이션에서 사용해야 하는 `상태에 대한 중앙 저장소 역할`을 합니다.

Redux에서 제공하는 패턴과 도구를 사용하면 애플리케이션의 상태가 언제, 어디서, 왜, 어떻게 업데이트되는지, 이러한 변경이 발생할 때 애플리케이션 로직이 어떻게 작동하는지 쉽게 이해할 수 있습니다 .

<br />

### 리덕스 사용해야 하는 이유

1. 앱의 여러 위치에 필요한 많은 양의 애플리케이션 상태가 있습니다.
2. 앱 상태는 시간이 지남에 따라 자주 업데이트됩니다.
3. 해당 상태를 업데이트하는 논리는 복잡할 수 있습니다.
4. 앱에는 중형 또는 대형 코드베이스가 있으며 많은 사람들이 작업할 수 있습니다.

<br />

### 리덕스 잘 사용하기 위한 전제 조건

- HTML, CSS
- ES6
- React 용어에 대한 지식 (JSX, State, 컴포넌트, Props, Hooks)
- JS 비동기 처리, Ajax 요청에 대한 지식

<br />

### Redux-Saga 연동하기

리덕스의 미들웨어로서 리덕스의 기능을 향상 시켜주는 기능이다. 이러한 미들웨어 속성을 사용하여 네트워크 요청과 같은 <비동기 작업>을 관리하면 매우 유용하다.

특정 액션이 디스패치 되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해준다.

```
$yarn add redux-saga
```

```
export default function* rootSaga() {
  //saga에는 제너레이터 함수를 사용한다.
  //function 뒤에 * 붙는 것으로 시작
}
```

<br />

---

<br />

## ⭐️ 리덕스 사가를 사용하는 이유

1. 기존 요청을 취소 처리해야 할 때 (불필요한 중복 요청 방지)
2. 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등
3. 리덕스와 관계없는 코드를 실행할 때
4. 웹 소켓을 이용할 때
5. API 요청 실패 시 재요청해야 할 때

<br />

## ⭐️ 리덕스 사가에서 알아두면 유용한 기능들

```
improt { delay, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

📍takeEvery : 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
📍takeLatest : 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.
📍select : 사가 내부에서 현재 상태를 조회하는 방법이다.
📍delay : 시간을 지정해서 기다린다. (1초 = 1000)
📍put : 특정 액션을 디스패치 해준다.
📍throttle : 사가가 실행되는 주기를 제한하는 방법
```

## ⭐️ Saga와 떼놓을 수 없는 immer 알아보기

```
$yarn add immer
```

```
ase ADD_COMMENT_SUCCESS: {
  const postIndex = state.mainPosts.findIndex((v)=> v.id === action.data.postId);
  const post = 📍{ ...state.mainPosts[postIndex]  };
  post.Comments = [dummyComment(action.data.content), ...post.Comments];
  const mainPosts = 📍[...state.mainPosts];
  mainPosts[postIndex] = post;
  return {📍
    ...state,
    mainPosts,
    addCommentLoading: false,
    addCommentDone: true
  };
}
```

이런식의 불변성 코드의 경우 잘못하면 에러나기 쉽상이다. 이럴 때는 `immer`라는 라이브러리를 사용하면 보다 효율적으로 코딩할 수 있다. 불변성 코드를 짜는 경우 이 immer 라이브러리는 필수이다.

## ⭐️ immer 의 특징

1. 이걸 사용하면 ... 같은 걸 안봐도 되서 코드가 훨씬 깔끔해진다.
2. 바로 배열에다 넣고 사용하면 된다.
3. 알아서 불변성 지켜서 다음상태를 만들어준다.
4. 코드 보기가 편해진다.

### immer 적용하게 되면 이렇게 간결해진다.

```
case REMOVE_POST_FAILURE:
  draft.removePostLoading = false;
  draft.removePostError = action.error;
  break;
```

break문은 필수.

```
ase ADD_COMMENT_SUCCESS: {
  const postIndex = state.mainPosts.findIndex((v)=> v.id === action.data.postId);
  const post = 📍{ ...state.mainPosts[postIndex]  };
  post.Comments = [dummyComment(action.data.content), ...post.Comments];
  const mainPosts = 📍[...state.mainPosts];
  mainPosts[postIndex] = post;
  return {📍
    ...state,
    mainPosts,
    addCommentLoading: false,
    addCommentDone: true
  };
}

👆 이랬던 코드가
---------------------------
👇 이렇게 된다.

case REMOVE_POST_FAILURE:
  draft.removePostLoading = false;
  draft.removePostError = action.error;
  break;

```
