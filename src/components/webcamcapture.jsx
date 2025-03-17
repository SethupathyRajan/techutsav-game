import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../style/webcam.css";
import Confetti from 'react-confetti';
import { Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { Brightness4, Contrast, FilterVintage } from '@mui/icons-material'; // MUI Icons for filters

const WebcamCapture = ({ onCapture, selectedCharacter ,handleBack }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");

  const frameImages = {
    "Kratos": "/assets/1.png",
    "Arthur Morgan": "/assets/2.png",
    "Ellie": "/assets/3.png",
    "Lara Croft": "/assets/4.png"
  };
  

  const frameImage = frameImages[selectedCharacter] || null;

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured Image: ", imageSrc);
    setCapturedImage(imageSrc);
    setIsPopupVisible(true);
  }, [webcamRef]);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const processImage = async () => {
    try {
      if (!capturedImage) return;
      const [capturedImg, frameImg] = await Promise.all([
        loadImage(capturedImage),
        frameImage ? loadImage(frameImage) : null,
      ]);
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = capturedImg.width;
      canvas.height = capturedImg.height;
      
      if (frameImg) {
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(capturedImg, 10, 130, canvas.width - 280, canvas.height - 70);
      
      const finalImage = canvas.toDataURL("image/png");
      setFinalImage(finalImage);
      onCapture(finalImage);
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  };

  return (
    <Box className="webcam-container" sx={{ padding: 2, backgroundColor: "black", color: "white" }}>
      {showConfetti && <Confetti />}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="webcam-feed"
      />
      <Button variant="contained" color="primary" onClick={captureImage} sx={{ mt: 2 }}>
        Capture Photo
      </Button>

      <Dialog open={isPopupVisible} onClose={() => setIsPopupVisible(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Preview Image</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {capturedImage ? (
            <Box
              component="img"
              src={capturedImage}
              alt="Captured"
              sx={{ width: "100%", height: "auto", filter: selectedFilter }}
            />
          ) : (
            <Typography>Processing the image...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={processImage} variant="contained" color="success">
            Apply Frame & Save
          </Button>
          <Button onClick={() => setIsPopupVisible(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
        <Button variant="text" onClick={handleBack} sx={{ color: "#d500f9", fontSize: "1.2rem", textTransform: "none" }}>
          ← Back
        </Button>
      </Box>
    </Box>
  );
};

export default WebcamCapture;
