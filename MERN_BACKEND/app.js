// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const employeeroutes = require('./routes/employeeroutes'); // Import employee routes

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Use employee routes
// app.use('/api', employeeroutes);

// // MongoDB connection URI (replace with your actual URI)
// const atlasURI = 'mongodb+srv://gokku:gokku_7025@gokku.cz4bx.mongodb.net/mernsdb?retryWrites=true&w=majority&appName=GOKKU';

// mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err.message);
//   });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeroutes'); // Import routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS for local development
app.use(express.json()); // Parse incoming JSON data

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the employee routes for API endpoints
app.use('/api', employeeRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
