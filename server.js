import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { spawn } from "child_process";

const app = express();
const port = 5000;
configDotenv();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Function to call the Python script
const swapFace = (userImage, frameImage) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["faceswap.py"]);
    const inputData = JSON.stringify({ user_image: userImage, frame_image: frameImage });

    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();

    let outputData = "";

    pythonProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(JSON.parse(outputData));
      } else {
        reject("Error processing face swap.");
      }
    });
  });
};

app.post('/swap-face', async (req, res) => {
  console.log('Received request to swap face');
  const { user_image, frame_image } = req.body;
  if (!user_image || !frame_image) {
    return res.status(400).send('Missing image data');
  }

  try {
    const response = await fetch('http://localhost:5001/swap-face', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_image, frame_image }),
    });

  

    const result = await response.json();
    res.status(200).json(result);
    console.log("Face swap result:", result); 
  } catch (error) {
    console.error("Error swapping face:", error);
    res.status(500).send('Face swap failed');
  }
});



// Email Route
app.post("/send-email", (req, res) => {
  const { to_email, image_data } = req.body;

  if (!to_email || !image_data) {
    return res.status(400).send("Missing email or image data.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to_email,
    subject: "Your Swapped Image",
    html: "<p>Here is your swapped image.</p>",
    attachments: [
      {
        filename: "swapped_image.png",
        content: image_data.replace(/^data:image\/\w+;base64,/, ""),
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email.");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully.");
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
