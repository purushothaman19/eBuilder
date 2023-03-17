import { FormControl, Grid, TextField,Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './text.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

    const [testName, setTest] = useState('');
    const [sText, setSLink] = useState('');
    const [duration, setDuration] = useState(0);


    const handleTName = (e) => setTest(e.target.value);
    const handleText = (e) => setSLink(e.target.value);

    const navigate = useNavigate();
    useEffect(()=>{ if(window.localStorage.getItem('loggedIn')!=='true') navigate('/login') })


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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 400;">
            <Grid item xs={12} sm={12} md={6} lg={6}>                 
              <img style={{height:'100%', width:'100%'}} src='https://i0.wp.com/blankhearts.com/wp-content/uploads/2022/04/cool-whatsapp-dp-33.jpg' alt='' />
            </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} className='text-div'>
                <TextField
                    helperText="Test Name"
                    id="outlined-multiline-flexible"
                    label="Test Name"
                    value={testName}
                    onChange={handleTName}
                    multiline
                    maxRows={4}
                    style={{marginBottom:'1.5em'}}
                />
                <br></br>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard" style={{marginLeft:0}}>
                    <TextField
                        // helperText="Paste your text here!"
                        id="standard-multiline-static"
                        placeholder='Paste your content to make questions'
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

                <button className='Textbtn' onClick={FetchData}>Create</button> 
                </Grid>
                </Grid>
        </section>
    )


}