import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from '../components/Landing/Landing';
import { useEffect, useState } from 'react';
import QueryString from 'qs';
import Home from '../components/Home/Home';
import Sheets from '../components/Home/Options/Sheets/Sheets';
import ViaText from '../components/Home/Options/Text/Text';
import MBattle from '../components/Home/Options/mBattle/mBattle';
import BattlePage from '../components/Home/Options/mBattle/BattlePage';
import ExamPage from '../components/Home/Exam/Exam';
import Dashboard from '../components/Home/Dashboard/Dashboard';
import { Box, Toolbar } from '@mui/material';
import { async } from 'q';
import Navbar from '../components/Navbar/Navbar';
import TestPage from '../components/Home/Exam/TestPage';


function App() {

  const [user, setUser] =  useState({});
  const [logged, setLoggedIn] =  useState(false);
  const [validUser, setVUser] =  useState(false);

  const queryParams = QueryString.parse(window.location.search) 
  const serverLog =  queryParams['?loggedIn']; 

  const getData = async () => {
    const res = await fetch('http://localhost:3002/getUser');
    const user = await res.json();
    if (user) {
      const username = user.displayName;
      setUser(user);
      setLoggedIn(true);
      window.localStorage.setItem('loggedIn', true);
      window.localStorage.setItem('dp', user._json.picture);
      window.localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userName',username);
    }
    console.log(logged);
  }

  if(!logged && serverLog) getData();
  
  const logout =  async() => {
    console.log('logged out');
    setUser({});
    setLoggedIn(false);
    setVUser(false);
    window.localStorage.setItem('loggedIn', false);
    window.localStorage.setItem('user', {});
    const fet =  await fetch("http://localhost:3002/logout");
    const res = await fet.json();
    console.log(res);
  }

  const checkValidation = async () => { 
      const res = await fetch('http://localhost:3002/validUser');
      const user = await res.json();
      console.log(user);
      setVUser( user );
  }

  useEffect(()=>{
    if(!validUser) checkValidation();
    console.log(validUser);
  })

  return (    
    <div className="App">

      <Router>

        { validUser ? (
          <Routes>
            <Route exact path="/" element={<Home logout={logout} /> }/>
            <Route exact path="/sheets" element={<Sheets /> }/>
            <Route exact path="/viatext" element={<ViaText /> }/>
            <Route exact path="/test" element={<TestPage/> } />
            <Route exact path="/dashboard" element={<><Navbar logout={logout} /><Dashboard /></>}/>
            <Route exact path="*" element={<LandingPage/> }/>
        </Routes>       
         ):(
           <Routes>
             <Route exact path="*" element={<LandingPage/> }/>
          </Routes>
        )}

      </Router>

    </div>
  );
}

export default App;
