import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const RoleSelection = ({ onSelectRole }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Select Your Role</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelectRole('student')}
        sx={{ m: 2 }}
      >
        Student
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onSelectRole('faculty')}
        sx={{ m: 2 }}
      >
        Faculty
      </Button>
    </Box>
  );
};

export default RoleSelection;
