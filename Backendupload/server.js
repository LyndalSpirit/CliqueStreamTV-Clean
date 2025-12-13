require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Welcome to CLIQUE TV API');
});

// Auth routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CLIQUE backend running on port ${PORT}`);
});
