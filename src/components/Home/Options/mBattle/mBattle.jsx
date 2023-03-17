import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import './mB.css';


export default function MBattle(props){

    const [rName, setRName] = useState('');
    const [rID, setRID] = useState('');

    const handlerName = (e) => setRName(e.target.value);
    const handleRID = (e) => setRID(e.target.value);

    // console.log(window.location.origin + '/BattlePage');

    return(

        <section id='mBattle'>
            <div className='mBattle-div'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6} lg={5} >
                        <h3> Create Room </h3>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Room Name"
                            value={rName}
                            onChange={handlerName}
                            multiline
                            maxRows={4}
                            style={{ marginBottom:'1em' }}
                        />
                        <a href={window.location.origin + '/BattlePage'}> <button className='mBbtn' style={{ marginBottom:'2em' }}>Create</button> </a>
                    </Grid>
                <Grid item  xs={12} md={6} lg={2} style={{ display:'flex', justifyContent:'center', alignItems: 'center'}}> 
                    <p id='or-text'>or</p> 
                </Grid>
                <Grid item  xs={12} md={6} lg={5}>
                        <h3> Join Room </h3>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Room ID"
                            value={rID}
                            onChange={handleRID}
                            multiline
                            maxRows={4}
                            style={{ marginBottom:'1em' }}
                        />
                        <a href={window.location.origin + '/BattlePage'}> <button className='mBbtn'>Join</button> </a>
                    </Grid>
                </Grid>
            </div>

        </section>
    )

} 
