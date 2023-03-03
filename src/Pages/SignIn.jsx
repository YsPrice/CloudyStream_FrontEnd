
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginFailed, loginStart, loginSuccess, logout } from "../redux/userSlice";
import { useEffect } from "react";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(90vh - 56px);
margin-top: 8%;
z-index:1;
width: 67vw;
margin-left:-10%;
padding-bottom:23%; 
max-height: 180vh;
color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
display: flex;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
align-items: center;
flex-direction: column;
padding: 70px 50px;
gap: 10px;
width: 33vw;
height: 105vh;
`;

const Title  = styled.h1`
font-size: 24px;
color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
color:${({ theme }) => theme.text};
`;

const Input = styled.input`
border-radius: 3px;
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px;
background-color: transparent;
width: 100%;
font-size: 1.3rem;
color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
border-radius: 5px;
border: 1px solid black;
padding: 10px 20px;
font-weight: 500;
font-size: 1rem;
cursor: pointer;
background-color: #fea889;
color: ${({ theme }) => theme.text};
`;

const SignIn = () => {
const [name, setName] = useState("");
const { error }  = useSelector((state) => state.user.error)
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
dispatch(loginStart());

  try{
  const res = await axios.post("/auth/signin", {name, password});
  console.log(res.data)
  dispatch(loginSuccess(res.data));
  navigate("/")
  } catch(err){
  dispatch(loginFailed())
  dispatch(logout())
}

};

const handleSignUp = async (e) => {
  e.preventDefault();
  try{
    const res = await axios.post("/auth/signup", {name, email, password})
    console.log(res.data)
    dispatch(loginStart(res.data.name, res.data.password));
    dispatch(loginSuccess(res.data));
    navigate("/")
  } catch(err){
    console.log(err)
  }
};

const signInWithGoogle = async () =>{
dispatch(loginStart())
  signInWithPopup(auth, provider)
  .then((result) => {
    axios.post("/auth/google", {
      name: result.user.displayName,
      email: result.user.email,
      img: result.user.photoURL
    })
    .then((res) => {
      console.log(res)
      dispatch(loginSuccess(res.data));
      navigate("/")
    })
  })
  .catch((error) => {
      dispatch(loginFailed());
      console.log(error)
  });
};

return(
  <Container>
    <Wrapper>
<Title>Sign In</Title>
<SubTitle>for a better Cloudy Stream Experience!</SubTitle>
<Input 
placeholder="username"
onChange={(e) => setName(e.target.value)}
/>
<Input 
type="password"
placeholder="password"
onChange={(e) => setPassword(e.target.value)}
/> 
<Button onClick={handleLogin}> 
Sign In
</Button>
{error ? (
<SubTitle style={{
     color: "red"
   }}>
     username or password incorrect!
   </SubTitle>
) : ( undefined)}

<Title>OR</Title>
<Button style={{width:'100%', height:'7vh', fontSize:'1.3rem'}}onClick={signInWithGoogle}>
  Sign In With Google
</Button>
<Title>OR!</Title>
<SubTitle>Sign Up</SubTitle>
<Input placeholder="username" 
onChange={(e)=> setName(e.target.value)}/>
<Input placeholder="email"
onChange={(e)=> setEmail(e.target.value)}/>
<Input placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
<Button onClick={handleSignUp} >
  Sign Up
</Button>
    </Wrapper>
  </Container>
)}

export default SignIn;