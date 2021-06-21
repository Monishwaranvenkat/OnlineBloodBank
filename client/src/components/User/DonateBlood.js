import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import {Backdrop,CircularProgress}  from "@material-ui/core"
import axios from "axios";
import theme from "../../theme/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [' Overall health', 'Age and weight', 'Pulse rate and Hemoglobin level','Donate'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Acceptable as long as you feel well, have no fever, and have no problems breathing through your mouth.
`;
    case 1:
      return 'You must be 18–65 years old and should weigh a minimum of 50  kg';
    case 2:
      return `Pulse rate- Between 50 and 100 without irregularities.
   		Hemoglobin level- A minimum of 12.5 g/dL.`;
	case 3:
      return `I agree that i am fit for donating blood and meet all the above mentioned conditions`;
		
    default:
      return 'Unknown step';
  }
}



export default function DonateBlood({id}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [loading, setLoading] = useState(false);
  const [donateBlood, setDonateBlood] = useState(false);



    async function bloodDonate() {
    if (
      new Date(localStorage.getItem("lastDonatedDate")).getDate() ===
      new Date().getDate()
    ) {
      setDonateBlood(false);
      window.alert(
        `You have recently donated on ${localStorage.getItem(
          "lastDonatedDate"
        )}. Please wait for 24hrs - 48hrs `
      );
    } else {
      setDonateBlood(false);
      setLoading(true);
      let result;
      try {
        let data = {
          date: new Date().toISOString().substring(0, 10),
          quantity: 1,
        };

        result = await axios({
          url: `${process.env.REACT_APP_URL}/donateBlood?id=${id}`,
          method: "post",
          data: data,
        });

        if (result.status === 200) {
          window.alert(result.data.message);
          localStorage.setItem(
            "lastDonatedDate",
            new Date().toISOString().substring(0, 10)
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        window.alert(err.response.data.message);
      }
    }
  }

  const handleNext = () => {
	
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === steps.length-1)
    {
	     bloodDonate();
	     handleReset();
	
    }
   
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
	  <Container>
		    <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>ColorlibStepIcon
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Donate' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </Container>
  );
}
