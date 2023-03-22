import { Button, FormControl, Grid, IconButton, Snackbar, TextField,Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './text.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const TEXT_LEN = 100;

function valuetext(value) {
    return `${value}°C`;
  }

  const PrettoSlider = styled(Slider)({
    color: '#F9D4D5',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#F9D4D5',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


export default function ViaText(props){

  const navigate = useNavigate();
  const [ failed,fetched  ] = useState(true);
  const [validUser, setVUser] = useState();
  async function validation(){
    const res = await fetch('http://localhost:3002/validUser')
    .catch((r)=> fetched(false) );
    const user = await res.json();
    setVUser(user);
    if(!user) return navigate('/');
  }
  useEffect(()=>{ if(!validUser) validation(); })

    const [testName, setTest] = useState('');
    const [sText, setSLink] = useState('');
    const [duration, setDuration] = useState(0);

    const [testNames, setTestNames] = useState([]);
    const [Loading, isLoading] = useState(true);

    const getData = async () => {
      const res = await fetch("http://localhost:3002/getTestNames");
      const data = await res.json();
      // console.log(data);
      setTestNames(data);
      if(data!==undefined) isLoading(false);
    };

    useEffect(() => {
      if (Loading) getData();
      console.log(testNames);
    });


    const handleTName = (e) => setTest(e.target.value);
    const handleText = (e) => setSLink(e.target.value);

    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          <a href='/dashboard'> Go </a>
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );


    async function FetchData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    text:sText,
                    name:testName,
                    duration:duration
                })
        };

        let response = await fetch('http://localhost:3002/text', requestOptions);
        console.log(response);
        if(response.status===200){
            getData();
            handleClick();
            const ques = await response.json();
            Swal.fire(
                    'Good job!',
                    'Test Created!',
                    'success'
                    )
                console.log(ques);
        } else return console.log('Not Successfull');
    }

    return(
        <section id='text'>
                { (!failed) ? 
            <div>
              <img style={{width:'50%'}} src='https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06083212/gravity_drib2.gif' alt='' />
              <h3> Cannot recieve our services, Sorry! </h3>
            </div> 
      :
      <>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Go to Dashboard"
              action={action}
            />
          </div>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 400;">
            <Grid item xs={12} sm={12} md={6} lg={6}>                 
              <img style={{height:'100%', width:'100%'}} src='https://i0.wp.com/blankhearts.com/wp-content/uploads/2022/04/cool-whatsapp-dp-33.jpg' alt='' />
            </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} className='text-div'>
                <TextField
                  error={testNames.includes(testName)}
                  color="success"
                  label="Test Name"
                  id="outlined-multiline-flexible"
                  helperText={testNames.includes(testName) ? 'Already Exists' : 'Test Name'}
                  value={testName}
                  onChange={handleTName}
                  multiline
                  maxRows={4}
                  style={{ marginBottom: "1.5em" }}
                />
                <br></br>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard" style={{marginLeft:0}}>
                    <TextField
                        color= { sText.length < TEXT_LEN ? 'error' : 'success' }
                        id="standard-multiline-static"
                        placeholder='Paste your content to make questions'
                        helperText={ sText.length < TEXT_LEN ? 'Place enough content' : 'It is fine now!' }
                        value={sText}
                        onChange={handleText}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                </FormControl>

                <Box sx={{ m: 3 }}/>
                <Typography gutterBottom style={{textAlign:'left'}} > Duration <small>(in mins)</small>  </Typography>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    onChange={(e)=>{ setDuration(e.target.value); }}
                    step={5}
                    marks
                    min={10}
                    max={250}
                    style={{ marginBottom:'2em' }}
                />

                <button 
                  className='Textbtn' 
                  onClick={FetchData}
                  disabled={testName ? (sText.length > TEXT_LEN ?  ( !testNames.includes(testName) ?  false : true )  : true) : true}
                >
                    Create
                </button> 
                </Grid>
                </Grid>
                </>}
        </section>
    )


}