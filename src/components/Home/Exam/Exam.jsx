import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./exam.css";
import Quiz from "react-quiz-component";
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';


const rawQuiz = [
  {
    topic: "PrepAI Benefits",
    category_type: 4,
    question: [
      "Ques  : Read the following statements carefully:",
      " Statement I:   telegram is a popular example of a chat app.",
      " Statement II:  whatsapp is a popular example of a chat app.",
      " Which of the following option is correct:",
    ],
    options: [
      " Both Statements are False.",
      " Statement I is True & Statement II is False.",
      " Statemet II is True.*",
      " Both Statements are True.",
    ],
    help_text:
      "We have all encountered chat over the web, that can be facebook, instagram, whatsapp and the list goes on.just to give a bit of context, you send a message to a person or a group, they see the message and reply back.",
  },
];

const format = {
  quizTitle: "Test Name",
  quizSynopsis: " All the Best! ",
  nrOfQuestions: "4",
  questions: [
    {
      question: " What is the speed achieved by edtech leaders using prepai?",
      correctAnswer: "0",
      answers: [" 12X Speed ", "  10X Speed", " 6X Speed", " 8X Speed"],
      questionType: "text",
    },
  ],
};

const quizConverted = [];
let ques = "";

export default function ExamPage(props) {

  
  const [qData, setQData] = React.useState({});
  const [duration, setDuration] = React.useState(0);
  const [showBtn, updateBtn] = React.useState('none');
  let questionData = window.localStorage.getItem("questionData");

  if (Object.keys(qData).length === 0) {

    questionData = JSON.parse(questionData);
    // console.log(questionData);

    console.log("duration: " + questionData.duration);
    setDuration(questionData.duration);
    console.log(duration);

    delete questionData["duration"];
    delete questionData["created"];
    questionData["nrOfQuestions"] = questionData["questions"].length;
    console.log(questionData);
    setQData(questionData);
    questionData = '';

  }

  React.useEffect(() => {
    console.log(qData);
  });

  rawQuiz.map((index) => {
    const ques = index.question;

    format.questions[0].question = ques.join("\n");

    // for(let q in ques) {
    //     console.log(ques[q]);
    //     quizConverted.push({'question': `${ques[q]}\n`})
    // }

    return 0;
  });


  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    console.log('clicked');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>

      <a href='/dashboard' style={{textDecoration:'none'}}>
        <Button color="secondary" size="small" onClick={handleClose}>
          GO
        </Button>
      </a>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#8EC3B0" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontWeight: "bold" }}
          >
            {qData.quizTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {qData ? (
        <div id="quiz-wrapper">
          <Quiz quiz={qData} onComplete={handleClick}/>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Back to Dashboard"
              action={action}
            />
        </div>
      ) : (
        <>
          <img src='https://cdn.dribbble.com/users/722246/screenshots/9714311/media/1714775b3deacede41aef42533ada46c.gif' alt='Loading' />
          <h3> Loading... </h3>
        </>
      )}
    </Box>
  );
}
