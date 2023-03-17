import { Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './sheets.css';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function valuetext(value) {return value;}


  const PrettoSlider = styled(Slider)({
    color: '#52af77',
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
      backgroundColor: '#52af77',
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

  

export default function Sheets(props){

    const [testName, setTest] = useState('');
    const [sLink, setSLink] = useState('');
    const [duration, setDuration] = useState(20);
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);

    const handleTName = (e) => setTest(e.target.value);
    const handleSLink = (e) => setSLink(e.target.value);

    // function FetchData(){}

    const handleSubmit = (e) =>{

      setErr('');
      console.log(testName, sLink);


      const body = JSON.stringify({ 
        name:testName,
        link:sLink,
        duration:duration,
      });

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    };

    // https://docs.google.com/spreadsheets/d/1heUgPl1T3gX2hgA16ACBxaHmjhOpMa2LYOFrap91-LA/edit?usp=sharing

      Swal.fire({
        title: 'Create exam?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: async (e) =>{

          const res = await fetch(`http://localhost:3002/sheets`, requestOptions);
          console.log(res.status);
          if(res.status===401){ setErr('Enter valid Link!'); return Swal.fire(`Enter Valid Link`,'','error') }
          else if (res.status === 400) { return console.log(res); }
          else if (res.status === 403) { setErr('The Sheet is empty!'); return console.log('Empty Sheets'); }
          
          else if (res.status === 200) 
          { 
              setSLink(''); 
              setTest(''); 
              setSuccess(true);
              const data = await res.json();
              console.log(data);
              return Swal.fire(`Question Created`,'You can view your test in Dashboard','success');
         }
          else setErr(''); 
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    }

    const navigate = useNavigate();
    useEffect(()=>{ if(window.localStorage.getItem('loggedIn')!=='true') navigate('/login') })

    return(
        <section id='sheets'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 400;">
            <Grid item xs={12} sm={12} md={6} lg={6}>          
       
              <img style={{height:'100%', width:'100%'}} src='https://static.vecteezy.com/system/resources/previews/007/716/787/original/cute-koala-cartoon-character-student-studying-and-writing-on-note-book-illustration-back-to-school-concept-free-vector.jpg' alt='' />
            </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} className='sheet-div'>
              { err && <p id='error'  style={{ color:'red', fontWeight:'bold' }}> {err} </p> }

                <TextField
                    color='success'
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
                <TextField
                    color='success'
                    helperText="Please enter Sheet link"
                    id="outlined-multiline-flexible"
                    label="Link"
                    value={sLink}
                    onChange={handleSLink}
                    multiline
                    maxRows={4}
                />
                <br></br>
                <Box sx={{ m: 3 }} />
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
                    max={200}
                    style={{ marginBottom:'2em' }}
                />
                <button className='Sheetbtn' onClick={handleSubmit} disabled={ testName ? sLink ? false : true : true } >Create</button> 
                </Grid>
                </Grid>
        </section>
    )


}