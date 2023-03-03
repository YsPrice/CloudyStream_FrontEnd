import  Card  from "../Components/Card";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
display: flex;
justify-content: space-between;
flex-wrap:wrap;
margin-top: 2%;
`;

const Home = ({random}) => {
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`videos/random`);
        setVideos(res.data);
      };
      fetchVideos();
    }, [random]);
  
    return (
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video}/>
        ))}
      </Container>
    );
  };
export default Home;