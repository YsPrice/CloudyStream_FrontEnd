import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChannelPage from "../Pages/ChannelPage"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, save} from "./video/videoSlice";
import { format } from "timeago.js";
import SaveIcon from '@mui/icons-material/Save';
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
width: 70vw;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Description = styled.p`
  font-size: 24px;
  padding:0;
  color: ${({ theme }) => theme.text};
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Button = styled.button`
padding: .83%;
padding-left:20%;
margin-top: -13%;
border: 1px solid;
border-radius: 5rem;
margin-left: 74%;
position: sticky;
  
  &&:hover{
  transition: .7s;
  background-color: lime;
}`;

const Video = () => {
  const { currentVideo } = useSelector((state) => state.video);
  const {currentUser} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const videoId = useLocation().pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const handleClick = ()=> {setOpen(true)}
  const handleClose = (e,reason)=>{if(reason === 'clickaway'){return;} setOpen(false);}
  const action = (
    <React.Fragment>
      <IconButton 
        size="medium"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
     
      </IconButton>
    </React.Fragment>
  );

  useEffect(()=> {
    // DONT ASSIGN VARIABLE TO THIS REQUEST
    axios.get(`/videos/find/${videoId}`).then((res) => {
      dispatch(fetchSuccess(res.data))})
  }, [videoId, dispatch])
 
    const handleSave = async () => {
      if(currentUser && currentVideo) {
       const res = await axios.put(`/users/save/${videoId}`);
       console.log(res.data)
        handleClick()
        }};
    
  return (
    <Container>
      {currentVideo && (
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
         {format(currentVideo?.createdAt)} 
          </Info>
        </Details>
        <Hr />
        <Description>
         Description:  {currentVideo?.desc}
  
       {currentUser ? (
            <>
 <Button onClick={handleSave}>
    <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          action={action}>

  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
  Video Saved
  </Alert>
   </Snackbar>
  <SaveIcon style={{marginRight:"1.3em", fontSize: '2.4em'}}/>
  </Button>
           </>
           ) : (<p style={{marginLeft:"80%", marginTop: "-2%"}}>sign in to save videos</p>)}
        </Description>    
      </Content>
      )} 
    </Container>

  )};

export default Video;