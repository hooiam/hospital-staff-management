const express = require('express')
const permissionsController = require('../controllers/permissions')
const router = express.Router()

// Get all permissions
router.get('/', permissionsController.getPermissions)

module.exports = router
