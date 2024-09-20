const express = require('express');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staff');
const roleRoutes = require('./routes/role');
const errorHandler = require('./exceptions')

const app = express();
const PORT = 8000;

// adding headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

// App level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/staffs', staffRoutes);

// Errors
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
