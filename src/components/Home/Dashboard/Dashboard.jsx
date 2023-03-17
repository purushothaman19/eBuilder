import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function DeleteButton() { return (<Button> Delete </Button>) }
function ShareButton() { return (<Button> Share </Button>) }
function AttendButton() { return ( <Button> Attend </Button>) }

const rows = [
  createData('Test 1', '11.03.2023', '1', [AttendButton(),'\t\t\t', DeleteButton(),'\t\t\t', ShareButton()] )
];

export default function Dashboard() {

  const [tests, setTest] = React.useState([]);
  const [Loading, isLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(()=>{ if(window.localStorage.getItem('loggedIn')!=='true') navigate('/login') })

  React.useEffect(()=>{
    if(Loading) {
      console.log('Loading: '+ Loading);

      const getData = async () => {
        const res = await fetch('http://localhost:3002/getTests');
        const data = await res.json();

        Object.keys(data).forEach((test, i)=>{
          if(i===0) setTest([]);
          const element = JSON.parse(data[test]);
          if( !tests.includes(element) ) setTest(prevArr => [...prevArr, element]);
        });
        isLoading(false);

        if(tests!==null && tests!==undefined){}
            
      }
      getData();
    }
    console.log(tests);
  },[Loading, tests])


  function attend(e) {
    const qData = e.target.id;
    window.localStorage.setItem('questionData', qData);
    window.open('/test');
  }

  return (
    <section id='dashboard' style={{ padding:'1% 10%' }}>

      <div style={{ display:'flex', justifyContent:'end' }}>
        <Button onClick={()=>{ isLoading(true) }} style={{ textTransform:'capitalize' }}> Refresh </Button>
      </div>

     <div style={{ marginTop:'3em' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Test Name </StyledTableCell>
              <StyledTableCell align="center"> Date Created </StyledTableCell>          
              <StyledTableCell align="center"> Actions </StyledTableCell>
            </TableRow>
          </TableHead>

          { (tests) ? (
              <TableBody>
                {tests.map((test, i) => (
                    <StyledTableRow key={test.quizTitle}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {test.quizTitle}
                      </StyledTableCell>
                      <StyledTableCell align="center">{test.created}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button style={{textTransform:'none'}} color='primary' onClick={attend} id={JSON.stringify(test)}> Attend </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                 ))}
              </TableBody>

            ):(
              <>
                <img src='https://cdn.dribbble.com/users/722246/screenshots/9714311/media/1714775b3deacede41aef42533ada46c.gif' alt='Loading' />
                <h3> Loading... </h3>
              </>
            )

          }

        
        </Table>
      </TableContainer>
     </div>
    </section>
  );
}
