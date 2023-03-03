import React from 'react';
import styled from 'styled-components';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  logout} from '../redux/userSlice';

const ContainerBg = styled.div`
width:100%;
height: 100%;
position: absolute;
top:0;
left:0;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index:1;
`;
const Wrapper = styled.div`
width: 590px;
height: 590px;
padding: 30px;
display: flex;
flex-direction: column;
gap:20px;
margin-left: -10vw;
position: relative; 
background-color: white;
color: black;
`;

const Close = styled.div`
position: absolute;
top:10px;
right:10px;
cursor:pointer;
`;
const Title = styled.h1`
text-align: center;
border-bottom: 1px solid grey;
`;
const Button = styled.button`
border-radius: 23px;
width: 40%;
margin-left: 30%;
margin-top:  20%;
color: white;
padding: 30px 30px;
font-weight: 600;
cursor: pointer;
border: 1px solid black;
background-color: #fea889;
font-size: 1.6rem;

`;
const Desc = styled.div`
position: relative;
margin-left: 38%;
color: grey;
padding: 10px;
padding-top: 35px;
background-color: transparent;
cursor: pointer;
`;

const LogOut = ({setOpenLog}) => {
const dispatch = useDispatch();
const navigate = useNavigate();

const signOutFunction = async (e) => {
e.preventDefault();
    dispatch(logout())
     setOpenLog(false)
      navigate("/signin")
}
  return (
   <ContainerBg>
       <Wrapper>
           
           <Close onClick={()=> setOpenLog(false)}>X</Close>

       <Title>Are you sure you want to Sign Out?</Title>
       <Button onClick={signOutFunction}>Get me Outta here </Button>

       <Desc onClick={()=> setOpenLog(false)}>
          Stay a bit longer
       </Desc>

       </Wrapper>
   </ContainerBg>
  )
}

export default LogOut;
