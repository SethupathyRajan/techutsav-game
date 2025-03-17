import React, { useState, useEffect } from "react";
import { Box, Button, Typography, ThemeProvider, CssBaseline, createTheme, Stepper, Step, StepLabel, Fade } from "@mui/material";
import StudentForm from "./StudentForm"; 
import WebcamCapture from "./webcamcapture";
import IDPreview from "./IDPreview";
import Header from "./header";
import "../style/matrix.css"; 


import frameKratos from "../assets/1.png";
import frameArthur from "../assets/2.png";
import frameEllie from "../assets/3.png";
import frameLara from "../assets/4.png";
import defaultFrame from "../assets/Idframe.png";

const stepTexts = [
  "Welcome to the World of\nGaming",
  "New Game\n Mission 1 : Capture the Moment",
  "Objective 1: Capture a Picture of Yourself",
  "Objective 2: Send it to you"
];

const characterFrames = {
  "Kratos": frameKratos,
  "Arthur Morgan": frameArthur,
  "Ellie": frameEllie,
  "Lara Croft": frameLara
};

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [capturedImage, setCapturedImage] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setFadeIn(true);
    }, 300);
  };

  useEffect(() => {
    const goFullScreen = () => {
      const elem = document.documentElement; // Get the entire page
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Edge
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // Internet Explorer
        elem.msRequestFullscreen();
      }
    };

    goFullScreen();
  }, []);

  const handleBack = () => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveStep((prev) => prev - 1);
      setFadeIn(true);
    }, 300);
  };

  const handleFormSubmit = (data) => {
    console.log("Received form data:", data);
    setFormData({
      gender: data.gender,
      character: data.character,
      frame: characterFrames[data.character] || defaultFrame,
    });
    handleNext();
  };

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    handleNext();
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#0f0" },
      secondary: { main: "#d500f9" },
      background: { default: "#000", paper: "#000" },
    },
    typography: {
      fontFamily: "monospace",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Fade in={fadeIn} timeout={500}>
        <Box sx={{ maxHeight: "100vh", p: 2 }}>
          {activeStep === 0 ? (
            <Box className="matrix-container" textAlign="center">
              <Typography className="matrix-text" data-text={stepTexts[activeStep]} sx={{ fontSize: { xs: "2rem", sm: "4rem", md: "6rem" }, whiteSpace: "pre-line" }}>
                {stepTexts[activeStep]}
              </Typography>
              <Button
                variant="text"
                onClick={handleNext}
                className="blinking"
                sx={{
                  mt: 3,
                  color: "#0f0",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                  fontFamily: "monospace",
                  textTransform: "none",
                  animation: "blink 2s infinite",
                }}
              >
                Press Here to Continue
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Typography variant="h2" sx={{ color: "#0f0", whiteSpace: "pre-line", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}>
                {stepTexts[activeStep]}
              </Typography>
            </Box>
          )}
          <Box sx={{ visibility: "hidden", height: 0 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {stepTexts.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 1 ? (
            <StudentForm handleFormSubmit={handleFormSubmit} handleBack={handleBack} />
          ) : activeStep === 2 ? (
            <WebcamCapture onCapture={handleImageCapture} character={formData.character} handleBack={handleBack}/>
          ) : activeStep === 3 ? (
            <IDPreview data={formData} img={capturedImage} frame={formData.frame} handleNext={handleNext}/>
          ) : activeStep === 4 ? (
            <Box
            sx={{
              display: "flex",
              justifyContent: "center", 
              alignItems: "center", 
              height: "100vh",
              width: "100vw", 
              backgroundColor: "black",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3rem", md: "6rem" },
                fontWeight: "bold",
                color: "#FFD700",
                textShadow: "4px 4px 10px #FF4500",
                fontFamily: "'Pricedown', sans-serif",
              }}
            >
              Mission Passed!
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "4rem" },
                fontWeight: "bold",
                color: "#FFF",
                textShadow: "4px 4px 10px #000",
                fontFamily: "'Pricedown', sans-serif",
              }}
            >
              Respect +
            </Typography>
          </Box>
          

          ) : null}
          
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

export default App;
