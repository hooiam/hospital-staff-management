require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const {authorizer, adminAuthorizer, can} = require('./middleware/auth')
const staffRoutes = require('./routes/staff')
const roleRoutes = require('./routes/role')
const permissionRoutes = require('./routes/permission')
const errorHandler = require('./exceptions')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 8000

// Handling CORS 
app.use(cors())

// App level middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use('/api/auth', logger, authRoutes)
app.use('/api/permissions', authorizer, adminAuthorizer, logger, permissionRoutes)
app.use('/api/roles', authorizer, adminAuthorizer, logger, roleRoutes)
app.use('/api/staffs', authorizer, can, logger, staffRoutes)

// Errors handling
app.use(errorHandler)

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = server
