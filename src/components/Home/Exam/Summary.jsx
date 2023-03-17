import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './exam.css';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';


export default function Summary(props){

    const correctAnswers = props.correctAnswers;
    const userAnswers = props.textAns;
    const questions = props.set;

    return(
        <section id='Summary'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid direction="row" justifyContent="center" alignItems="stretch" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 300">
                    {correctAnswers.map((e, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <div class="uk-card uk-card-default" style={{display: 'flex',  borderRadius:'9px', minHeight: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div class="uk-card-header">
                                <div class="uk-grid-small uk-flex-middle" uk-grid>
                                    <div class="uk-width-expand">
                                        <h3 class="uk-card-title uk-margin-remove-bottom ques" >{questions[index].question}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-card-body">
                                <p>
                                   You Chose
                                    <Button
                                        className="ansBtn"
                                        style={{ marginTop:'2%', marginBottom:'3%', width:'80%', opacity:'0.5' }} 
                                        variant='contained'
                                        color={ userAnswers[index] === e ? 'success' : 'error' }
                                        disabled={false}
                                    >
                                        {userAnswers[index]}
                                    </Button>
                                </p>
                            </div>

                            <div class="uk-card-footer">Correct Answer: <span style={{background:'#13ff13', padding:'2% 5%', borderRadius:'99px'}}> {e} </span> </div>
                        </div>
                    </Grid>
                    ))}
                </Grid>
            </Box>    
        </section>
    )


}