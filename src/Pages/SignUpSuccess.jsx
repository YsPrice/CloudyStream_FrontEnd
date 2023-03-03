import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from "./Home.jsx";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: white;

`;


const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 50px 50px;
gap: 30px;
border-radius: 10px;
border: 1px solid gray;

`;
const Title  = styled.h1`
font-size: 24px;
color: black;
`;


const SignUpSuccess = () => {
  return (
 <Container>
     <Wrapper>
         <Title>
             Account Successfully Created!
             <Title>
                
                 <Link to={"/"} element={<Home />}>
                 Return to the HomePage
                 </Link>
             </Title>
         </Title>
     </Wrapper>
 </Container>
  )
}

export default SignUpSuccess