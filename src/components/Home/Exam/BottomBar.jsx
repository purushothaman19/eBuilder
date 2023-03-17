import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';


export default function BottomAppBar(props) {

    const [clockColor, setCClr] = React.useState('white');

    const btnStyle={ 
        borderRadius:'3px', 
        textTransform:'none', 
        textDecoration:'none',
        background:'white',
        fontSize:'1.8vh'
    }

    const confirmSubmit = () => { 

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Submitted!',
                'Successfully submitted the exam!',
                'success'
              )
                props.handleClick(true);
            }
          })    
    };

    return (
    <React.Fragment>
      <AppBar position="fixed" style={{background:'#c8c8c8', boxShadow:'#707070 -1px 2px 20px 1px', }} sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" style={{ fontSize:'2.4vh' }}>
            <span> Time Remaining:  </span>
            <span  style={{fontWeight:'bold', color:clockColor}}>
                <span id='hour'> 01 </span> :
                <span id='min' > 20 </span> :
                <span id='sec' > 33 </span>
            </span>
        </Typography>
          <Box sx={{ flexGrow: 1 }} />
           <Button variant='outlined' color="success" style={btnStyle} onClick={confirmSubmit} > Submit </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}