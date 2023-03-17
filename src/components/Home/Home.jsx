import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Feature from "./Features/Features";
import './home.css';
import Lander from './Lander/Lander';


export default function Home(props){

    const navigate = useNavigate();
    useEffect(()=>{ if( window.localStorage.getItem('loggedIn')!=='true' ) navigate('/login') })

    return(
            <section id='home'>
                <Navbar logout={props.logout} />
                <Lander />
                <Feature />
            </section>
    )
}