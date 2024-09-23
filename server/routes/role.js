const express = require('express')
const rolesController = require('../controllers/roles')
const { sanitizeRoleReq } = require('../middleware/role')
const router = express.Router()

// Create a role
router.post('/', sanitizeRoleReq, rolesController.createRole)

// Get all roles
router.get('/', rolesController.getRoles)

// Get role by ID
router.get('/:id', rolesController.getRoleById)

// Update a role by ID
router.put('/:id', sanitizeRoleReq, rolesController.updateRole)

// Delete a role by ID
router.delete('/:id', rolesController.deleteRole)

module.exports = router
