{/*import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import missionPassedSound from "../assets/mission_passed.mp3";

const IDPreview = ({ data, img, frame, handleNext }) => {
  const [finalImage, setFinalImage] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMissionPassed, setShowMissionPassed] = useState(false);

  useEffect(() => {
    if (img && frame) {
      fetchSwappedFace();
    }
  }, [img, frame]);

  useEffect(() => {
    if (showMissionPassed) {
      const audio = new Audio(missionPassedSound);
      audio.play(); 
      setTimeout(() => handleNext(), 2000); 
    }
  }, [showMissionPassed]);

  const fetchSwappedFace = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/swap-face", {
        user_image: img,
        frame_image: frame
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
        boxShadow: "0px 0px 15px #0f0"
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: "#0f0" }} />
      ) : finalImage ? (
        <img 
          src={finalImage} 
          alt="ID Preview" 
          style={{
            maxWidth: "100%", 
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
          width: "100%", 
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
            maxWidth: "100%", 
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
          width: "100%", 
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
 
export default IDPreview;