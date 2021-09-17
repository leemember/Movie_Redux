import React from "react";
import styled from "styled-components";

const Photo = ({ title, id, medium_cover_image, summary, rating }) => {
  return (
    <Post>
      <Title>
        <img src={medium_cover_image} alt={id} />
      </Title>

      <Body>
        <h4>🎞 {title}</h4>
        <p className="star">⭐️ 평점 : {rating} </p>
        <p>{summary}</p>
      </Body>
    </Post>
  );
};

export default Photo;

const Post = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;

  color: #030303;
  h4 {
    font-weight: 500;
    text-align: left;
    font-size: 1.4rem;
  }
  .star {
    font-size: 1.4rem;
  }
  p {
    margin-right: 5px;
    text-align: left;
    font-weight: 500;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  padding: 10px;
  text-align: center;
  img {
    width: 100%;
  }
`;
