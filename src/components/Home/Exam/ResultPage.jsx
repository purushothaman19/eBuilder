import { useState } from 'react';
import './exam.css';
import Summary from './Summary';

export default function ResultPage(props) {

    const [summ, showSummary] = useState(false);

    function summary(){
        showSummary(true);
        document.getElementById('Summary').scrollIntoView();
    }

    return(
        <>
        <section id='ResultPage'>

            <div id='score-div'>
                <h1> Score </h1>
                <hr style={{marginBottom:0, height:'1px', borderTop:' 1px solid #000'}}></hr>
                <h1 id='score'> {props.score} </h1> 
                <button class="uk-button" style={{color:'#ED5B79'}} onClick={summary} > Summary </button>
                <button class="uk-button" style={{color:'#ED5B79'}}> Retake </button>
            </div>
        </section>

        { summ && 
                    <Summary props={props} /> 
        }
        </>
    )

}