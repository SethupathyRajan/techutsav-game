import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Card, CardActionArea, CardContent, Fade } from "@mui/material";
import kratos from "../assets/1.png";
import Lara from "../assets/4.png";
import arthur from "../assets/2.png";
import ellie from "../assets/3.png";
<<<<<<< HEAD
import agent47 from "../assets/5.png";
import jc from "../assets/7.png";
import jill from "../assets/6.png";
import evie from "../assets/8.png";
=======
>>>>>>> ebed995e4f646d2a63cd62b8d3bf98180aaa2ce4

const StudentForm = ({ handleFormSubmit, handleBack }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [characterIndex, setCharacterIndex] = useState(0);
  const [characters, setCharacters] = useState([]);
  const scrollContainerRef = useRef(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    setCharacterIndex(0);
    setCharacters(
      gender === "male"
        ? [
            { name: "Kratos", img: kratos },
            { name: "Arthur Morgan", img: arthur },
<<<<<<< HEAD
            { name: "Agent 47", img: agent47 },
            { name: "Johnny Cage", img: jc }
            
=======
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
            { name: "Arthur Morgan", img: arthur },
>>>>>>> ebed995e4f646d2a63cd62b8d3bf98180aaa2ce4
          ]
        : [
            { name: "Ellie", img: ellie },
            { name: "Lara Croft", img: Lara },
<<<<<<< HEAD
            { name: "Jill Valentine", img: jill},
            { name: "Evie Frye", img: evie }
=======
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara },
            { name: "Lara Croft", img: Lara }
>>>>>>> ebed995e4f646d2a63cd62b8d3bf98180aaa2ce4
          ]
    );
  };

  const handleCharacterSelection = (character) => {
    setSelectedCharacter(character);
    handleFormSubmit({ gender: selectedGender, character });
  };

  // Handle keyboard navigation with boundary checks
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedGender || selectedCharacter) return;

      if (event.key === "ArrowRight") {
        // Only move right if not at the last character
        if (characterIndex < characters.length - 1) {
          setCharacterIndex(prev => prev + 1);
        }
      } else if (event.key === "ArrowLeft") {
        // Only move left if not at the first character
        if (characterIndex > 0) {
          setCharacterIndex(prev => prev - 1);
        }
      } else if (event.key === "Enter") {
        handleCharacterSelection(characters[characterIndex].name);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGender, selectedCharacter, characterIndex, characters]);

  // Render only 3 characters: prev, current, next
  const getVisibleCharacters = () => {
    if (characters.length === 0) return [];
    
    const result = [];
    
    // Add previous character if it exists
    if (characterIndex > 0) {
      result.push({
        ...characters[characterIndex - 1],
        position: "prev",
        index: characterIndex - 1
      });
    }
    
    // Add current character
    result.push({
      ...characters[characterIndex],
      position: "current",
      index: characterIndex
    });
    
    // Add next character if it exists
    if (characterIndex < characters.length - 1) {
      result.push({
        ...characters[characterIndex + 1],
        position: "next",
        index: characterIndex + 1
      });
    }
    
    return result;
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        {!selectedGender ? (
          <>
            <Typography variant="h4" sx={{ color: "#0f0", mb: 6, textShadow: "0 0 10px #0f0" }}>You Are a..</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                <CardActionArea onClick={() => handleGenderSelection("male")}> 
                  <CardContent>
                    <Box sx={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={kratos} alt="Kratos" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
                    </Box>
                    <Typography variant="h5" sx={{ mt: 2 }}>Male</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", color: "#0f0", width: 240, border: "2px solid #0f0", boxShadow: "0 0 15px #0f0" }}>
                <CardActionArea onClick={() => handleGenderSelection("female")}> 
                  <CardContent>
                    <Box sx={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={Lara} alt="Lara Croft" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
                    </Box>
                    <Typography variant="h5" sx={{ mt: 2 }}>Female</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </>
        ) : !selectedCharacter ? (
          <>
            <Typography variant="h4" sx={{ color: "#0f0", mb: 6, textShadow: "0 0 10px #0f0" }}>
              Select Your Character
              <Typography variant="subtitle1" sx={{ color: "#0f0", mt: 1 }}>
                Use ← → arrows to navigate and Enter to select
              </Typography>
            </Typography>
            
            {/* Character selection carousel with 3 visible characters */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 320,
                position: "relative",
                overflow: "visible",
                mb: 4
              }}
            >
              {getVisibleCharacters().map((char) => {
                // Define styles based on position
                const isPrev = char.position === "prev";
                const isCurrent = char.position === "current";
                const isNext = char.position === "next";
                
                return (
                  <Card
                    key={`${char.name}-${char.index}`}
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.3)",
                      color: "#0f0",
                      width: isCurrent ? 220 : 160,
                      height: isCurrent ? 280 : 220,
                      position: "absolute",
                      left: isPrev ? "calc(50% - 240px)" : isNext ? "calc(50% + 80px)" : "50%",
                      transform: isCurrent ? "translateX(-50%) scale(1.1)" : isPrev ? "translateX(-50%) scale(0.9)" : "translateX(-50%) scale(0.9)",
                      zIndex: isCurrent ? 10 : 1,
                      opacity: isCurrent ? 1 : 0.8,
                      transition: "all 0.3s ease-in-out",
                      border: isCurrent ? "4px solid #ff0" : "2px solid #0f0",
                      boxShadow: isCurrent ? "0 0 25px #ff0" : "0 0 15px #0f0",
                    }}
                  >
                    <CardActionArea 
                      onClick={() => isCurrent ? handleCharacterSelection(char.name) : setCharacterIndex(char.index)}
                      sx={{ 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column" 
                      }}
                    > 
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        display: "flex", 
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2
                      }}>
                        <Box sx={{ 
                          flexGrow: 1, 
                          width: "100%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          mb: 2
                        }}>
                          <img 
                            src={char.img} 
                            alt={char.name} 
                            style={{ 
                              maxWidth: "90%", 
                              maxHeight: isCurrent ? "180px" : "140px", 
                              objectFit: "contain", 
                              borderRadius: 8,
                              transition: "max-height 0.3s ease-in-out"
                            }} 
                          />
                        </Box>
                        <Typography 
                          variant={isCurrent ? "h5" : "h6"}
                          sx={{ 
                            transition: "font-size 0.3s ease-in-out",
                            textShadow: isCurrent ? "0 0 10px #ff0" : "none"
                          }}
                        >
                          {char.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
            
            {/* Navigation indicators */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
              {characters.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: index === characterIndex ? "#ff0" : "rgba(0, 255, 0, 0.5)",
                    cursor: "pointer",
                    boxShadow: index === characterIndex ? "0 0 8px #ff0" : "none",
                  }}
                  onClick={() => setCharacterIndex(index)}
                />
              ))}
            </Box>
            
            {/* Arrow navigation buttons */}
            {characterIndex > 0 && (
              <Button 
                sx={{ 
                  position: "absolute", 
                  left: "20%", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#0f0",
                  fontSize: "2rem",
                  "&:hover": { bgcolor: "rgba(0,255,0,0.1)" }
                }}
                onClick={() => setCharacterIndex(prev => prev - 1)}
              >
                ←
              </Button>
            )}
            
            {characterIndex < characters.length - 1 && (
              <Button 
                sx={{ 
                  position: "absolute", 
                  right: "20%", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#0f0",
                  fontSize: "2rem",
                  "&:hover": { bgcolor: "rgba(0,255,0,0.1)" }
                }}
                onClick={() => setCharacterIndex(prev => prev + 1)}
              >
                →
              </Button>
            )}
          </>
        ) : null}

        <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
          <Button 
            variant="text" 
            onClick={() => (selectedGender ? setSelectedGender("") : handleBack())} 
            sx={{ 
              color: "#d500f9", 
              fontSize: "1.2rem", 
              textTransform: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "rgba(213, 0, 249, 0.1)",
              }
            }}
          >
            ← Back
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default StudentForm;