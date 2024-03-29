import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

//내가 원하는 props를 가져오기 위해서 console.log(props)를 하고 원하는 정보만 파싱을 해야한다.

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {

    console.log(data);
    const {
      seeUser: {
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
        </Header>
      </>
    );
  }
});
