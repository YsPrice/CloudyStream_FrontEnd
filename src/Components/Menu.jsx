import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useNavigate } from "react-router-dom";
import SignIn from "../Pages/SignIn";

const logo = require('../assets/LogoWhite.png');
const logo2 = require('../assets/Logo.png');
const Container = styled.div`
flex:1;
background-color: ${({ theme }) => theme.bgLighter};
height:80vh;
margin-bottom: 20%;
position: sticky;
font-size: 34px;
top:0;
max-width:45%;
`;
const Wrapper = styled.div`
padding: 18px 25px;
`;

const Logo = styled.div`
display:flex;
align-items: center;
gap:.4%;
font-weight:2000;
margin-bottom: 5%;
color: ${({ theme }) => theme.text};
`;

const Item = styled.div`
display:flex;
align-items:center;
gap: 20px;
cursor:pointer;
padding 17.5px;
color: ${({ theme }) => theme.text};

    &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Img = styled.img`
height: 50px;
padding:10px
color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
position: relative; left: 25px;
color:${({ theme }) => theme.text};
font-size: 1rem;
padding: 10px;
font-weight: 2100;
`;

const Button = styled.button`
padding: 15px 25px;
background-color: transparent;
border: 1px solid ${({ theme }) => theme.text};
color: ${({ theme }) => theme.text};
font-size: 1.2rem;
width: 11rem;
border-radius: 3px;
font-weight: 1500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`;

 const Menu = ({darkMode, setDarkMode}) => {
    const {currentUser} = useSelector((state) => state.user);
    
    return(
     <Container>
      <Wrapper>
          <Link to="/" style={{textDecoration: "none"}}>
          <Logo> <Img src={ darkMode ? logo: logo2}/>CloudyStream </Logo></Link>
          <Link to="/" style={{textDecoration: "none"}}><Item>Home</Item></Link>
          <Link to={!currentUser ? "/signin" : `channel/${currentUser._id}`} style={{textDecoration:"none"}}>
             <Item> Saved</Item> </Link>
            <>
          <Item onClick={()=> setDarkMode(!darkMode)}>
         <SettingsBrightnessOutlinedIcon/> {darkMode ? "Light" : "Dark"} Mode
          </Item>  
            </>     
<Hr/>
 <>
        {currentUser ? (undefined) : (
        <Login> 
Sign in to Upload
<Link to="signin">
    <Button style={{textDecoration: "none"}}>
     <AccountCircleOutlinedIcon/>Sign In
     </Button>
</Link>
</Login> )}
</>     
      </Wrapper>  
    </Container>
    )}
    
export default Menu;



