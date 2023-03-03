import styled, { ThemeProvider } from 'styled-components';
import  Menu  from './Components/Menu.jsx'
import React, {useState} from 'react';
import './App.css';
import SignIn from "./Pages/SignIn.jsx";
import  Home  from './Pages/Home.jsx';
import { NavBar } from './Components/NavBar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video from "./Pages/Video.jsx"
import Search from './Pages/Search.jsx';
import SignUpSuccess from './Pages/SignUpSuccess.jsx';
import { useSelector } from 'react-redux';
import ChannelPage from './Pages/ChannelPage.jsx';
import { lightTheme, darkTheme } from './theme/Theme.js';

const Container = styled.div`
display: flex;
background-color: ${({ theme }) => theme.bg};
max-width: 200vw;

  @media screen and (max-width: 924px){
  width: 150%;
  overflow: hidden;
  }
`;

const Main = styled.div`
flex:7
overflow: hidden;
position: sticky;
`;

const Wrapper = styled.div`
padding: 22px 96px;`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
   <Container>
<BrowserRouter>
<Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
  <Main>
  <NavBar/>
    <Wrapper>
<Routes>
<Route path="/">
  <Route index element={<Home type="random" />} />
  <Route path="search" element={<Search />} />
  <Route path="signin" element={currentUser ? <Home /> : <SignIn/>}/>
  <Route path="channel">
    <Route path=":id" element={currentUser ? <ChannelPage /> : <SignIn />}/>
  </Route>
  <Route path="video">
    <Route path=":id" element={<Video />} />
  </Route>
</Route>
<Route path="signup" element={<SignIn/>}>
 <Route path="signupsuccess" element={<SignUpSuccess/>}/>
</Route>
</Routes>
  </Wrapper>
  </Main>
</BrowserRouter>
   </Container>
   </ThemeProvider>
  );
}

export default App;
