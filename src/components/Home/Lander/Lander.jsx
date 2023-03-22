import './Lander.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';


export default function Lander(props){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <section id='Lander'>
            <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={12}>
                    <div className='quote-sec'>
                        <h1 id='l-brand'>ExamBuilder</h1>
                        <p id='quote'> 
                            "ExamBuilder is created for those who want to test themselves. 
                            They can test themselves with the help of their data and tools we have. 
                            They can <span>create</span> and <span>share</span> their tests" 
                        </p>
                        <p id='author'> - The developer </p>
                        <div className='explore-sec'>
                        <a href='#features' style={{textDecoration:'none', marginRight:'3%'}}><Button id='explore'> Explore  </Button></a>
                        <a href='/dashboard' style={{textDecoration:'none'}}><Button id='dash'> Dashboard </Button></a>
                    </div>
                    </div>
                </Grid>

                {/* <Grid item xs={12} md={6}>
                     
                </Grid> */}
            </Grid>
            </Box>
        </section>
    )

}