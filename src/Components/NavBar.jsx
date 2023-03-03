import styled from 'styled-components';
import { useState } from 'react';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Upload from './Upload';
import LogOut from "./LogOut"

const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.back};
height: 56px;
max-width:100vw;
overflow: hidden;
`;

const User = styled.div`
display:flex;
align-items: center;
gap: 10px;
font-weight: 100;
color: black;
justify-content: space-between;
padding-right: 8px;
padding: 3%;
padding-left: 10%;
color: white;
    @media screen and (max-width:1079px ){
    display:none;
}
`;

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content: flex-end;
height: 100%;
position: relative;
padding: 0px 20px;
margin-left: -11%;
`;

const Button = styled.button`
display:flex;
padding: 10px 20px;
border: 1px solid black;
color:white ;
border-radius: 5px;
font-size: 1.2rem;
font-weight: 0;
cursor: pointer;
align-items:center;
gap:5px;
background-color: #fea889;

    @media screen and (max-width:1079px ){

}
`;

const Search = styled.div`
display: flex;
width: 40%;
position: absolute;
left: 0%;
right:0%;
margin: auto;
align-items:center;
justify-content:space-between;
padding:8px;
border: 1px solid white;
border-radius: 3px;
color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
color: white;
font-size: 1.2rem;
padding: 1.5%;
margin-right:3%;
`;

export const NavBar = () => {
 const navigate = useNavigate();
const [open, setOpen] = useState(false);
const [q, setQ] = useState("");
const [openLog, setOpenLog] = useState(false);
const { currentUser} = useSelector((state) => state.user);

const handleKey = (e) => {
    if(e.key === 'Enter' ) { navigate(`/search?q=${q}`) }}

    return(
        <>
<Container>
    <Wrapper>
        <Search>
        <Input placeholder="Search"
        onChange={(e)=> setQ(e.target.value)}
        onKeyDown={handleKey}
        />
        <SearchOutlinedIcon style={{color: "gray"}} onClick={()=> navigate(`/search?q=${q}`) } />
        </Search>

            {currentUser ? (
     <User style={{padding:"2%"}}>  

            <FileUploadIcon style={{ cursor:"pointer", paddingLeft:"1rem"}}
            onClick={ ()=> setOpen(true)}/>
             {currentUser.name}

     </User> 
            ) : (
                 <Link to="signin" style={{ textDecoration: "none"}}>
                   <Button>
                      <AccountCircleOutlinedIcon/>
                      Sign In
                  </Button>
                 </Link>
            )}

            <>
          {currentUser ? 
          (<Button onClick={()=> setOpenLog(true)}>Sign Out </Button> ) : ( undefined )}
            </>
    </Wrapper>
</Container>
{open && <Upload setOpen={setOpen}/>}
{openLog && <LogOut setOpenLog={setOpenLog} />}
</> 
);

};