import { Box, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import './fea.css';

const icons = [
    "https://img.icons8.com/bubbles/100/null/google-sheets--v2.png",
    "https://img.icons8.com/external-flatarticons-blue-flatarticons/100/null/external-text-file-shopping-and-commerce-flatarticons-blue-flatarticons.png",
    // "https://img.icons8.com/material-outlined/100/null/room.png",
    // "https://img.icons8.com/material-outlined/100/null/room.png",
    // "https://img.icons8.com/material-outlined/100/null/room.png",
    // "https://img.icons8.com/material-outlined/100/null/room.png",
    // "https://img.icons8.com/material-outlined/100/null/room.png",
]


export default function Feature(props){

    const address = String(window.location.origin);
    console.log(address);

    const LinkData = {
        0: ["Google Sheets", 'Continue with your google sheets', `sheets`],
        1: ['Text File', 'Make questions with your content', `viatext`],
        // 2: ['mBattle', "It's a different Batlle", `mBattle`],
        // 3: ['mBattle', "It's a different Batlle", `mBattle`],
        // 4: ['mBattle', "It's a different Batlle", `mBattle`],
        // 5: ['mBattle', "It's a different Batlle", `mBattle`],
    }

    return(
        <section id='features'>
            <h1 id="fea-head"> Look at our features </h1>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 400;">
            {Array.from(Array(2)).map((_, index) => (
                <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined" className="feaCards">
                        <React.Fragment>
                            <CardContent>
                                <img src={icons[index]} alt="" />
                                <Typography variant="body2">
                                    {LinkData[index][0]}
                                <br />
                                {LinkData[index][1]}
                                </Typography>
                            </CardContent>
                            <CardActions style={{display:'flex', justifyContent:'flex-end'}}>
                                <a style={{textDecoration:'none', width:'100%'}} href={ '/'+LinkData[index][2] }>
                                     <button className='fbtns'>Learn More</button> 
                                </a>
                            </CardActions>
                        </React.Fragment>
                        </Card>
                    </Box>
                </Grid>
            ))}
            </Grid>
        </section>
    )

}