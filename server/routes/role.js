const express = require('express');
const rolesController = require('../controllers/roles')
const router = express.Router();

// Create a role
router.post('/', rolesController.createRole);

// Get all contacts
router.get('/', async (req, res) => {
  try {
    
  } catch (error) {
    
  }
});

// Get a contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, about, phone, country } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First Name, Last Name, and Email are required' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, about, phone, country },
      { new: true, runValidators: true}
    );

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
