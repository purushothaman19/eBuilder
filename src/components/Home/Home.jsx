import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Feature from "./Features/Features";
import './home.css';
import Lander from './Lander/Lander';


export default function Home(props){


    const navigate = useNavigate();
    const [validUser, setVUser] = useState();
    async function validation(){
      const res = await fetch('http://localhost:3002/validUser');
      const user = await res.json();
      setVUser(user);
      if(!user) return navigate('/');
    }
    useEffect(()=>{ if(!validUser) validation(); })

    return(
            <section id='home'>
                <Navbar logout={props.logout} />
                <Lander />
                <Feature />
            </section>
    )
}