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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  //배경색깔
  background: #FFF0F5;
  box-sizing: border-box;
  }
`;

const Container = styled.div`
  height: 100%;
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-gap: 20px;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 500;
  margin-top: 2em;
`;
