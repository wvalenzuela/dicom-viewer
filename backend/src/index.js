// server.js
import express from 'express';
import { DicomSlice } from './dicoms';
import models from 'models';

const cors = require('cors');
const app = express();
const port = 5001;

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});
app.get('/api/dicom', async (req, res, next) => {
  console.log('---- DICOM -----');
  return await DicomSlice(req, res, models);
});
models.sequelize.sync({ force: false }).then(async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('===================================================');
    console.log('===================================================');
    console.log(`🚀 Server ready at http://localhost:${port}/api`);
    console.log('===================================================');
    console.log('===================================================');
  });
});
