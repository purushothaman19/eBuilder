import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Button, Grid, Paper, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-width",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DashSummary(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClose() {
    props.handleClose(false);
  }

  let marks = [],
    duration = [],
    time = [];

  if (props.data !== null) {
    console.log(props.data);
    const data = props.data;

    for (let ele in data) {
      ele = JSON.parse(data[ele]);
      marks.push(ele.marks);
      duration.push(ele.duration);
      time.push(ele.time);
    }

    console.log(marks);
    console.log(duration);
    console.log(time);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style} style={{ padding:'5%' }}>

          { (props.data===undefined) ? 
        <> 
          <h4> You have not attended this test yet! </h4>
        
        </>
        :
          <>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <h1> Test name </h1>
                <p>Number of times attended: {marks.length} </p> 
              </Grid>

              <Grid item xs={6}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  style={{ marginBottom:'10%' }}
                >
                  <Grid item xs={4}>
                    <div id="display">
                      <div id="high" style={{ textAlign: "center" }}>
                        <h2> High Score </h2>
                        <h2> { Math.max.apply(Math, marks)} </h2>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div id="display">
                      <div id="high" style={{ textAlign: "center" }}>
                        <h2> Low Score </h2>
                        <h2> { Math.min.apply(Math, marks)}  </h2>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div id="display">
                      <div id="high" style={{ textAlign: "center" }}>
                        <h2> Average Score </h2>
                        <h2> { marks.reduce((acc,v,i,a)=>(acc+v/a.length),0).toFixed(2) }  </h2>
                      </div>
                    </div>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TableContainer component={Paper}  sx={{ maxHeight: 500 }}>
                  <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          {" "}
                          Date Attended{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          Time Taken{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          Marks Scored{" "}
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {props.data ? (
                      <TableBody>
                        {Array.from(Array(marks.length))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((_, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">
                              {time[index]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {duration[index]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {marks[index]}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    ) : (
                      <>
                        <img
                          src="https://cdn.dribbble.com/users/722246/screenshots/9714311/media/1714775b3deacede41aef42533ada46c.gif"
                          alt="Loading"
                        />
                        <h3> Loading... </h3>
                      </>
                    )}
                  </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={time.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Grid>
            </Grid>
                  </>
                }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
