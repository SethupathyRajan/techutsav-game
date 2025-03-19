import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import missionPassedSound from "../assets/mission_passed.mp3";
import { useRef } from "react";




const IDPreview = ({ data, img, frame, handleNext ,handleBack}) => {
  const [finalCaptureImage, setFinalCapturedImage] = useState(null);
  const [finalFrameImage, setFinalFrameImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMissionPassed, setShowMissionPassed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!img || !frame) return;

    const processImages = async () => {
      try {
        const canvas1 = document.createElement("canvas");
        const canvas2 = document.createElement("canvas");
        const ctx1 = canvas1.getContext("2d");
        const ctx2 = canvas2.getContext("2d");

        const capturedImg = new Image();
        const frameImg = new Image();

        capturedImg.src = img;
        frameImg.src = frame;

        await new Promise((resolve) => (capturedImg.onload = resolve));
        await new Promise((resolve) => (frameImg.onload = resolve));

        canvas1.width = frameImg.width;
        canvas1.height = frameImg.height;
        canvas2.width = capturedImg.width;
        canvas2.height = capturedImg.height - 100; // Fixed height issue

        ctx1.drawImage(frameImg, 0, 0, canvas1.width, canvas1.height);
        ctx2.drawImage(capturedImg, 0, 0, canvas2.width, canvas2.height);

        setFinalFrameImage(canvas1.toDataURL("image/png"));
        setFinalCapturedImage(canvas2.toDataURL("image/png"));
      } catch (err) {
        console.error("Operation Failed", err);
      }
    };

    processImages();
  }, [img, frame]);

  useEffect(() => {
    if (finalCaptureImage && finalFrameImage) {
      fetchSwappedFace();
    }
  }, [finalCaptureImage, finalFrameImage]);

  useEffect(() => {
    if (showMissionPassed) {
      const audio = new Audio(missionPassedSound);
  
      audioRef.current?.pause();
      audioRef.current = audio;
  
      audio.currentTime = 0;
      audio.play().catch(error => console.error("Audio playback failed:", error));
  
      setTimeout(() => handleNext(), 0);
    }
  }, [showMissionPassed]);

  const fetchSwappedFace = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/swap-face", {
        user_image: finalCaptureImage,
        frame_image: finalFrameImage,
      });

      setFinalImage(response.data.swapped_image);
    } catch (err) {
      console.error("Error fetching swapped face:", err);
      setFinalImage(null);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      if (!finalImage) {
        console.error("Final image is missing!");
        return;
      }

      await axios.post("http://localhost:5000/send-email", {
        to_email: email,
        image_data: finalImage,
      });

      setShowMissionPassed(true);
    } catch (err) {
      console.error("Error sending email", err);
    }
    setEmail("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 3,
        p: 3,
        border: "2px solid #0f0",
        borderRadius: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        boxShadow: "0px 0px 15px #0f0",
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: "#0f0" }} />
      ) : finalImage ? (
        <img
          src={finalImage}
          alt="ID Preview"
          style={{
            maxWidth: "40%",
            maxHeight :"40%",
            border: "3px solid #0f0",
            borderRadius: "12px",
            boxShadow: "0px 0px 10px #0f0",
          }}
        />
      ) : (
        <Typography color="error" sx={{ fontSize: "1.5rem" }}>
          Error generating ID Preview
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          mt: 2,
        }}
      >
        <TextField
          label="Enter your email"
          placeholder="youremail@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{
            input: { textAlign: "center", fontSize: "1.2rem", color: "#0f0" },
            "& .MuiInputLabel-root": { color: "#0f0", fontSize: "1.1rem" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#0f0" },
              "&:hover fieldset": { borderColor: "#d500f9" },
              "&.Mui-focused fieldset": { borderColor: "#d500f9" },
            },
            bgcolor: "black",
            borderRadius: 1,
          }}
        />

        <Button
          onClick={sendEmail}
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#0f0",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0px 0px 10px #0f0",
            "&:hover": { bgcolor: "#d500f9" },
          }}
        >
          Send
        </Button>
      </Box>
       <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
              <Button variant="text" onClick={handleBack} sx={{ color: "#d500f9", fontSize: "1.2rem", textTransform: "none" }}>
                ← Back
              </Button>
            </Box>
    </Box>
  );
};

export default IDPreview;

{/*}
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from "axios";
import missionPassedSound from "../assets/mission_passed.mp3";

const IDPreview = ({ data, img, frame, handleNext }) => {
  const [finalImage, setFinalImage] = useState(null);
  const [email, setEmail] = useState("");
  const [showMissionPassed, setShowMissionPassed] = useState(false);

  useEffect(() => {
    if (img && frame) {
      PreviewID();
    }
  }, [img, frame]);

  useEffect(() => {
    if (showMissionPassed) {
      const audio = new Audio(missionPassedSound);
      audio.play(); 
      setTimeout(() => handleNext(), 0); 
    }
  }, [showMissionPassed]);

  const PreviewID = async () => {
    try {
      if (!img || !frame) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const capturedImg = new Image();
      const frameImg = new Image();

      capturedImg.src = img;
      frameImg.src = frame;

      await new Promise((resolve) => (capturedImg.onload = resolve));
      await new Promise((resolve) => (frameImg.onload = resolve));

      canvas.width = frameImg.width;
      canvas.height = frameImg.height;
      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(capturedImg, 120, 130, canvas.width-100, canvas.height-100);

      setFinalImage(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Operation Failed", err);
    }
  };

  const sendEmail = async () => {
    try {
      if (!finalImage) {
        console.error("Final image is missing!");
        return;
      }
      await axios.post("http://localhost:5000/send-email", {
        to_email: email,
        image_data: finalImage,
      });

      setShowMissionPassed(true); 
    } catch (err) {
      console.error("Error sending email", err);
    }
    setEmail("");
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: 3, 
        mt: 3, 
        p: 3, 
        border: "2px solid #0f0", 
        borderRadius: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        boxShadow: "0px 0px 15px #0f0"
      }}
    >
    
      {finalImage ? (
        <img 
          src={finalImage} 
          alt="ID Preview" 
          style={{
            maxWidth: "450px", 
            maxHeight: "450px",
            border: "3px solid #0f0", 
            borderRadius: "12px",
            boxShadow: "0px 0px 10px #0f0"
          }} 
        />
      ) : (
        <Typography color="error" sx={{ fontSize: "1.5rem" }}>Error generating ID Preview</Typography>
      )}
  
    
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          width: "450px", 
          maxWidth: 400, 
          mt: 2 
        }}
      >
        <TextField
          label="Enter your email"
          placeholder="youremail@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{
            input: { textAlign: "center", fontSize: "1.2rem", color: "#0f0" },
            "& .MuiInputLabel-root": { color: "#0f0", fontSize: "1.1rem" }, // Placeholder Color Fix
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#0f0" },
              "&:hover fieldset": { borderColor: "#d500f9" },
              "&.Mui-focused fieldset": { borderColor: "#d500f9" },
            },
            bgcolor: "black",
            borderRadius: 1,
          }}
        />
  
       
        <Button 
          onClick={sendEmail} 
          variant="contained" 
          sx={{ 
            mt: 2, 
            bgcolor: "#0f0", 
            color: "black", 
            fontWeight: "bold", 
            fontSize: "1.1rem",
            boxShadow: "0px 0px 10px #0f0",
            "&:hover": { bgcolor: "#d500f9" }
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
 
export default IDPreview;*/}