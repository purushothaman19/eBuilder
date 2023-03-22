import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from '../components/Landing/Landing';
import { useEffect, useState } from 'react';
import Home from '../components/Home/Home';
import Sheets from '../components/Home/Options/Sheets/Sheets';
import ViaText from '../components/Home/Options/Text/Text';
import Dashboard from '../components/Home/Dashboard/Dashboard';
import Navbar from '../components/Navbar/Navbar';
import TestPage from '../components/Home/Exam/TestPage';


function App() {

  const [user, setUser] =  useState({});
  const [validUser, setVUser] =  useState();
  const [ failed,fetched  ] = useState(true);

  const getData = async () => {
    const res = await fetch('http://localhost:3002/getUser')
    .catch((r)=> fetched(false) );
    const user = await res.json();
    if (user) {
      const username = user.displayName;
      setUser(user);
      if(Object.keys(user).length!==0) {
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem('dp', user._json.picture);
        window.localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userName',username);
      }
    }
  }

  const checkValidation = async () => { 
    const res = await fetch('http://localhost:3002/validUser')
    .catch((r)=> fetched(false) );
    const propUser = await res.json();
    setVUser( propUser );
    if(propUser) return getData();
    if(!propUser) return localStorage.clear();
  }

  useEffect(()=>{ if(!validUser) checkValidation(); })

  const logout =  async() => {
    console.log('logged out');
    setUser({});
    setVUser(false);
    localStorage.clear();
    const fet =  await fetch("http://localhost:3002/logout");
    const res = await fet.json();
    console.log(res);
  }


  return (    
    <div className="App">

      { (!failed) ? 
            <div>
              <img style={{width:'50%'}} src='https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06083212/gravity_drib2.gif' alt='' />
              <h3> Cannot recieve our services, Sorry! </h3>
              <p> <a href='.'>Reloading</a> may help! </p>
            </div> 
      :
      <>
          <Router>
                <Routes>
                  <Route exact path="/" element={ validUser ? ( <Home logout={logout} user={user}/> ): <LandingPage/>  }/>
                  <Route exact path="/sheets" element={<Sheets /> }/>
                  <Route exact path="/viatext" element={<ViaText /> }/>
                  <Route exact path="/test" element={<TestPage/> } />
                  <Route exact path="/dashboard" element={<><Navbar logout={logout} /><Dashboard /></>}/>
              </Routes>     
          </Router>
      </>
      }

    </div>
  );
}

export default App;
