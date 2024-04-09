// Example using Express
import express from "express";
const app = express();

app.post("/api/upload", (req, res) => {
  // Handle the uploaded file here (e.g., save it, process it)
  res.send("File uploaded successfully!"); // Or an appropriate response
});

app.listen(3000, () => console.log("Server listening on port 3000"));
