import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import DashSummary from './DashSummary';

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

  const navigate = useNavigate();
  const [ failed,fetched  ] = React.useState(true);

  const [validUser, setVUser] = React.useState();
  async function validation(){
    const res = await fetch('https://exbuilder.onrender.com/validUser')
    .catch((r)=> fetched(false) );
    const user = await res.json();
    setVUser(user);
    console.log(user);
    if(!user) return navigate('/');
  }
  React.useEffect(()=>{ if(!validUser) validation(); })


  const [tests, setTest] = React.useState([]);
  const [Loading, isLoading] = React.useState(true);

  const getData = async () => {
    const res = await fetch('https://exbuilder.onrender.com/getTests');
    const data = await res.json();

    Object.keys(data).forEach((test, i)=>{
      if(i===0) setTest([]);
      const element = JSON.parse(data[test]);
      if( !tests.includes(element) ) setTest(prevArr => [...prevArr, element]);
    });
    isLoading(false);

    if(tests!==null && tests!==undefined){}      
  }


  React.useEffect(()=>{ if(Loading) getData(); })

  const [summary, gotSummary] = React.useState(false);
  const [sumData, setSumData] = React.useState({});

  const getSummary = async(e) => {
    const res = await fetch('https://exbuilder.onrender.com/getSummary');
    const data = await res.json();
    console.log(data);
    setSumData(data);
    gotSummary(true);
  }

  React.useEffect(()=>{ if(!summary) getSummary();  })
  React.useEffect(()=>{ if(sumData!==null) console.log(sumData); })

  function attend(e) {
    const qData = e.target.id;
    window.open('/test');
    window.localStorage.setItem('questionData', qData);
    // navigate('/test');
  }

  //  == ==     Modal Area    ==  ==//  
  const [open, setOpen] = React.useState(false);
  const [sumFor, setSumFor] = React.useState({});

  const handleOpen = (e) => {
    const query  = e.target.id;
    console.log(query);
    setSumFor(sumData[query]);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  // React.useEffect(()=>{ if(!Boolean(localStorage.loggedIn)) navigate('/'); })

  function Refresh(){
    isLoading(true);
    getData();
  } 
  
  function SummaryRefresh(){
    gotSummary(false);
    getSummary();
  } 

  return (
    <section id='dashboard' style={{ padding:'1% 10%' }}>

      { (!failed) ? 
      <div>
        <img style={{width:'50%'}} src='https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06083212/gravity_drib2.gif' alt='' />
        <h3> Cannot recieve our services, Sorry! </h3>
      </div> 
      :
      <>
      { open && <DashSummary open={open} handleClose={handleClose}  data={sumFor} /> }

      <div style={{ display:'flex', justifyContent:'end' }}>
        <Button onClick={Refresh} style={{ textTransform:'capitalize' }}> Refresh </Button>
        <Button onClick={SummaryRefresh} style={{ textTransform:'capitalize' }}> Refresh Summary </Button>
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
                        <Button style={{textTransform:'none'}} color='primary' onClick={handleOpen} id={test.quizTitle}> Summary </Button>
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
     </>
    }

    </section>
  );
}
