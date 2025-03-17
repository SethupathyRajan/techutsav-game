import React, { useState } from "react";
import { Box, Button, Typography, Card, CardActionArea, CardContent, Fade } from "@mui/material";

const StudentForm = ({ handleFormSubmit, handleBack }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleCharacterSelection = (character) => {
    setSelectedCharacter(character);
    handleFormSubmit({ gender: selectedGender, character });
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ textAlign: "center", p: 4}}>
        {!selectedGender ? (
          <>
            <Typography variant="h4" sx={{ color: "#0f0", mb: 6, textShadow: "0 0 10px #0f0" }}>You Are a..</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                <CardActionArea onClick={() => handleGenderSelection("male")}> 
                  <CardContent>
                    <Typography variant="h5">Male</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                <CardActionArea onClick={() => handleGenderSelection("female")}> 
                  <CardContent>
                    <Typography variant="h5">Female</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </>
        ) : !selectedCharacter ? (
          <>
            <Typography variant="h4" sx={{ color: "#0f0", mb: 6, textShadow: "0 0 10px #0f0" }}>Select Your Character</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              {selectedGender === "male" ? (
                <>
                  <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                    <CardActionArea onClick={() => handleCharacterSelection("Kratos")}> 
                      <CardContent>
                        <Typography variant="h5">Kratos - God of War</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                    <CardActionArea onClick={() => handleCharacterSelection("Arthur Morgan")}> 
                      <CardContent>
                        <Typography variant="h5">Arthur Morgan - Red Dead Redemption</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              ) : (
                <>
                  <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                    <CardActionArea onClick={() => handleCharacterSelection("Ellie")}> 
                      <CardContent>
                        <Typography variant="h5">Ellie - The Last of Us</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                    <CardActionArea onClick={() => handleCharacterSelection("Lara Croft")}> 
                      <CardContent>
                        <Typography variant="h5">Lara Croft - Tomb Raider</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              )}
            </Box>
          </>
        ) : null}
        <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
          <Button variant="text" onClick={() => (selectedGender ? setSelectedGender("") : handleBack())} sx={{ color: "#d500f9", fontSize: "1.2rem", textTransform: "none" }}>
            ← Back
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default StudentForm;