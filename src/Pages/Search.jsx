import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../Components/Card";

const Container = styled.div`
display: flex;
flex: 1;
flex-wrap: wrap;
gap: 10px;
margin-top: 3%;
margin-left: -5vw;
width:70vw;
`;

const Wrapper = styled.div`
background-color:${({theme}) => theme.soft}; 
display: flex;
flex-wrap:wrap;
justify-content: space-between;
`;

const Title = styled.h1`
font-size: 3rem;
color:${({theme}) => theme.text}; 
padding-left: 15%;
`;


const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    useEffect(()=> {
        const fetchVideos = async ()=> {
            const res = await axios.get(`/videos/search${query}`)
            setVideos(res.data)
        };
        fetchVideos()
    }, [query]);
  return (
      
  <Container>
      <Wrapper style={{ position:'absolute', marginLeft: "11vw", width:"40vw"}}>
         <>
        <Title style={{marginBottom:'11%', marginTop:'10%',}}>results for "{query.slice(3)}"</Title>
        </>
      </Wrapper>
        {videos.map((video) => (
             <Wrapper style={{marginTop: "20%"}}>
        <Card key={video._id} video={video}/>
        </Wrapper>
       ))}
      </Container>
  )}

export default Search