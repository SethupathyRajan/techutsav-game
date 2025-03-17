import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import WebcamCapture from './webcamcapture';  // Import the WebcamCapture component

const FacultyForm = ({ onNext }) => {
  const [step, setStep] = useState(1);
  const [facultyData, setFacultyData] = useState({
    facultyId: '',
    dob: '',
    bloodGroup: '',
    department: '',
    specialRoles: '',
    image: null // Add image field
  });

  const handleInputChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleImageCapture = (image) => {
    setFacultyData({ ...facultyData, image });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    onNext(facultyData);
  };

  return (
    <Box>
      {step === 1 && (
        <Box>
          <Typography variant="h5">Faculty Details - Step 1</Typography>
          <TextField
            label="Faculty ID"
            name="facultyId"
            value={facultyData.facultyId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            name="dob"
            value={facultyData.dob}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={nextStep} variant="contained">Next</Button>
        </Box>
      )}
      {step === 2 && (
        <Box>
          <Typography variant="h5">Faculty Details - Step 2</Typography>
          <TextField
            label="Blood Group"
            name="bloodGroup"
            value={facultyData.bloodGroup}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={facultyData.department}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={nextStep} variant="contained">Next</Button>
        </Box>
      )}
      {step === 3 && (
        <Box>
          <Typography variant="h5">Capture Your Image</Typography>
          <WebcamCapture onCapture={handleImageCapture} /> {/* Capture image with webcam */}
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Box>
      )}
    </Box>
  );
};

export default FacultyForm;
