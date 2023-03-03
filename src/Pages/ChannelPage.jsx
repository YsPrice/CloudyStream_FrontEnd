import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Card from '../Components/Card';
import axios from 'axios';

const Container = styled.div`
display: flex;
justify-content: space-between;
flex-wrap:wrap;
margin-top: 2%;
`;

const Button = styled.button`
display:flex;
padding: 5px 25px;
border: 1px solid; 
color:white;
border-radius: 15px;
font-weight: 500;
cursor: pointer;
align-items:center;
background-color: red;
height: 4vh;
position: sticky;
`;

const Title = styled.h1`
font-size: 45px;
font-weight: 500;
border-bottom: 1px solid grey;
padding: 30px;
width: 120%;
overflow: hidden;
color: ${({theme}) => theme.text}
`;

const SubTitle = styled.h2`
font-size: 25px;
font-weight: 1200;
color: ${({theme}) => theme.text};
padding: 30px;
width: 70%;
`;

const Wrapper = styled.div`
max-width: 55vw;
margin: auto;
margin-bottom: 1.2%;
background-color:${({theme}) => theme.soft}; 
display: flex;
justify-content: space-between;
position: sticky;
align-content: right;
flex-wrap:wrap;
padding: 2px;
`;

const ChannelPage = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [videos, setVideos] = useState([]);

    useEffect(()=> {
 const fetchSaved = async () => {
   try{
  axios.get(`/users/saved/${currentUser._id}`).then((res)=> {
    setVideos(res.data)})
 
}catch(err){}

};

  fetchSaved()
},[]);


const deleteSaved = async () => {
  try{
    axios.delete(`/videos/saved/${currentUser._id}`).then(()=> {

window.location.reload()
    });
  } catch(err){
    console.log(err)
  }
}
  return (
 <>   
 <Container >
   <Title>
     {currentUser.name}'s Saved Videos
   </Title>
  {videos.length > 0 ? ( 
    <>
    {videos?.map((video) => (
      <>
         <Wrapper style={{ marginLeft: '2%'}}>
   <Card key={video._id} video={video}/>
   <Button onClick={deleteSaved} id={video._id}>
     DELETE
   </Button>
   </Wrapper>
   </>
 ))}
 </> 
 ) : (
 <SubTitle>
   saved videos will appear here</SubTitle>
   )}
</Container>
</>  
)}



export default ChannelPage