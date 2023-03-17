import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Grid } from "@mui/material";
import Summary from "./Summary";
import Countdown from "react-countdown";
import { Prompt, useNavigate } from 'react-router'

const steps = [
  {
    question: `Who is Modi?`,
    options: [ 'PM', 'CM', 'AM', 'Unknown' ]
  },
  {
    question: `Who is Messi?`,
    options: [ 'GOAT', 'GOD', 'KING', 'Unknown' ]
  },
  {
    question: `Who is MSD?`,
    options: [ 'THALA', 'MAHI', 'FINISHER', 'Unknown' ]
  },
];

// const correctAnswers = [0,1,0];


export default function TestPage(props) {

    const quesData = JSON.parse(window.localStorage.getItem('questionData'));
    console.log(quesData);

    const testName = quesData.quizTitle;
    const quesAns = quesData.questions;
    const duration = quesData.duration;
    const correctAnswers = quesData.correctAnswers;

    console.log(correctAnswers);
    let crtAns = [];
    quesAns.forEach((element, i) => {
        crtAns.push( element.options[correctAnswers[i]] );
    });

    const [data, setData] = React.useState(
        { date: Date.now(), delay: (60000*duration) } //60 seconds
      );
      const wantedDelay = 60000; //60 s

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [answered, checkAnswered] = React.useState(false);
    const [currElem, setCurr] = React.useState();
    const [submitBtn, toggleSubmitBtn] = React.useState(false);
    const [result, showRslt] = React.useState(false);
    const [points, setPoints] = React.useState(0);
    const [width, setWidth] = React.useState(12);

    const [ansText, setAnsTxt] = React.useState([]);

    const maxSteps = quesAns.length;

    const [summ, showSummary] = React.useState(false);

    function summary(){
        showSummary(true);
        document.getElementById('Summary').scrollIntoView();
    }

    const opting = (e) => {
        const element = e.target;
        setCurr(e);
        
        console.log( element.ariaLabel );

        setAnsTxt(old => [...old, quesAns[Number(element.id)].options[Number([element.ariaLabel])] ])

        // after choosing options
        const elem = document.getElementById('curr'+activeStep);
        elem.style.pointerEvents = 'none';

        element.style.opacity = 1;
        checkAnswered(true);
    }

    // updating answers
    React.useEffect(()=>{ console.log(ansText); console.log(points); })

    // updating the result
    React.useEffect(()=>{ 
        if(ansText.length === quesAns.length){
            toggleSubmitBtn(true);
        }
        window.onbeforeunload = function(){
            return 'Are you sure you want to leave?';
        };
    });


    const onSubmit = () => {

        showRslt(true);
        setWidth(6);
        let score=0
        if(ansText.length!==0){
          ansText.forEach((answer, i) => {
            console.log(String(answer)===String(crtAns[i]));
            if(String(answer)===String(crtAns[i])) score++;
          });
        }
        setPoints(score);
    }
  
    const handleNext = () => {

        const elem = document.getElementById('curr'+activeStep);
        elem.style.pointerEvents = 'all';
        elem.classList.add('answered');


        currElem.target.style.opacity = 0.5;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        checkAnswered(false);
    
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getLocalStorageValue = (s) => localStorage.getItem(s);

    React.useEffect(() => {

        const savedDate = getLocalStorageValue("end_date");

        if (savedDate != null && !isNaN(savedDate)) {
          const currentTime = Date.now();
          const delta = parseInt(savedDate, 10) - currentTime;
    
          //Do you reach the end?
          if (delta > wantedDelay) {
            //Yes we clear uour saved end date
            if (localStorage.getItem("end_date").length > 0)
              localStorage.removeItem("end_date");
          } else {
            //No update the end date  
            setData({ date: currentTime, delay: delta });
          }
        }

    }, []);

    const navigate = useNavigate();
    React.useEffect(()=>{ if(window.localStorage.getItem('loggedIn')!=='true') navigate('/login'); })

  return (
    <section id="test">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    { !result && 
                <Grid item xs={12} sm={12} md={width} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity:1, }} >

        <h2 className="ques"> {testName} </h2>
        <Countdown
            date={data.date + 6000}
            // date={data.date + data.delay}
            renderer={renderer}
            onStart={(delta) => {
            //Save the end date
            console.log("end_date: " + localStorage.getItem("end_date"));
            if (localStorage.getItem("end_date") === null) localStorage.setItem( "end_date", JSON.stringify(data.date + data.delay) );
            }}

            onComplete={() => {
              if (localStorage.getItem("end_date") !== null) localStorage.removeItem("end_date");
              onSubmit();
            }}
        />

      <Box style={{ width:'100%' }}  sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{"Question: "+ (activeStep+1)}</Typography>
        </Paper>
        <Box sx={{ height: 50, maxWidth: 400, width: "100%", p: 2 }} style={{color:'black', fontWeight:'600'}}>
          {quesAns[activeStep].question}
        </Box>

        <Box id={"curr"+ activeStep} sx={{ maxWidth: 400, width: "100%", p: 2 }} style={{color:'black', fontWeight:'600', pointerEvents:'all'}}>
            { quesAns[activeStep].options.map((opt, i)=> (
                <div>
                    <Button 
                        className="ansBtn"
                        id={activeStep} 
                        aria-label={i} 
                        style={{ marginBottom:'3%', width:'80%', opacity:'0.5' }} 
                        variant="outlined" 
                        color="primary" 
                        onClick={opting}
                        disabled={false}
                    >
                        {opt}
                    </Button><br></br> 
                </div>
                ))
            }
        </Box>

            <MobileStepper
                variant="progress"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={ (!answered) || (activeStep === maxSteps - 1) }>
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={true}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                    </Button>
                }
                />
            <Button id='submitbtn' color='error' variant="outlined" disabled={!submitBtn} onClick={onSubmit} > Submit </Button>
      </Box>
            </Grid>
}
            { result && 

                <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity:1 }} >
                        <section id='ResultPage'>
                            <div id='score-div'>
                                <h1> Score </h1>
                                <hr style={{marginBottom:0, height:'1px', borderTop:' 1px solid #000'}}></hr>
                                <h1 id='score'> {points} </h1> 
                                <button class="uk-button" style={{color:'#ED5B79', borderRight: '#374b5c 1px solid'}} onClick={summary} > Summary </button>
                                <button class="uk-button" style={{color:'#ED5B79'}} onClick={()=>{ window.location.reload(); }}> Retake </button>
                            </div>
                        </section>

                    { summ && <Summary correctAnswers={crtAns} textAns={ansText} set={quesAns} /> }
                </Grid>
            }

        </Grid>
    </section>
  );
}

const renderer = ({ hours, minutes, seconds, completed }) => {

    
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span style={{color:'#ED5B79', fontWeight:'600', fontSize:'1.2em', padding:'2%'}}>
            Time Left:  <span>{hours>9 ? hours : `0${hours}` }:{ minutes>9 ? minutes : `0${minutes}`}:{ seconds >9 ? seconds : `0${seconds}`}</span>
        </span>
      );
    }
};

const Completionist = () => <span>You are good to go!</span>;
