const express = require('express');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staff');
const roleRoutes = require('./routes/role');

const app = express();
const PORT = 8000;

// adding headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


// App level middleware
app.use(bodyParser.json());

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/staffs', staffRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
