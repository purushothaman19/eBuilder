import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Splide, SplideSlide } from '@splidejs/react-splide';


import './exam.css';
import QuizPage from "./QuizComponent";

export default function QArea(props) {
    
    const sample = props.sampe;                         ///////////////////// --------------- have to be changed ------------------ ///////////////////
    const [ans, setAns] = React.useState({});

    const handleChange = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        setAns(prevValue=>({...prevValue,[key]: value}));
        // window.sessionStorage.setItem(key, value);
    }

    const handleSubmit = (e) => {
        console.log(ans);
    }

    React.useEffect(()=>{ 
        if(props.submitted) handleSubmit();
        console.log(ans);
    })

  return (
    <section id="q-area">
      <FormControl>
        { !sample && <QuizPage /> }
        { sample &&
            Object.keys(sample).map((key, i)=>{
                return(
                    <FormControl style={{ marginBottom:'10%' }} id={`ques`+key}>
                        <FormLabel id="demo-row-radio-buttons-group-label" style={{marginBottom:'3%'}}>
                            {(Number(key)+1) + ". " + sample[key][0]}
                        </FormLabel>
                        <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        >
                        <FormControlLabel name={key} value={sample[key][1]} control={<Radio />} label={sample[key][1]} onChange={handleChange} />
                        <FormControlLabel name={key} value={sample[key][2]} control={<Radio />} label={sample[key][2]} onChange={handleChange} />
                        <FormControlLabel name={key} value={sample[key][3]} control={<Radio />} label={sample[key][3]} onChange={handleChange} />
                        <FormControlLabel name={key} value={sample[key][4]} control={<Radio />} label={sample[key][4]} onChange={handleChange} />
                        </RadioGroup>
                    </FormControl>
                )
            })
        }
      </FormControl>
    </section>
  );
}
