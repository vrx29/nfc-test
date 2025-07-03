const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = 4000;

app.use(cors());


app.get('/api/face', (req, res) => {
  const imgPath = path.join(__dirname, 'face.JPG');
  const imgStream = fs.createReadStream(imgPath);

  res.set('Content-Type', 'image/jpeg');
  imgStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
