const express = require('express')
const staffController = require('../controllers/staffs')
const { sanitizeStaffReq } = require('../middleware/staff')
const router = express.Router()

// Create a new staff
router.post('/', sanitizeStaffReq, staffController.createStaff)

// Get all staffs
router.get('/', staffController.getStaffs)

// Get staff by id
router.get('/:id', staffController.getStaffById)

// Update a staff by ID
router.put('/:id', sanitizeStaffReq, staffController.updateStaff)

// Delete a staff by ID
router.delete('/:id', staffController.deleteStaff)

module.exports = router
