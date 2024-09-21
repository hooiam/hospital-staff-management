'use strict'

const request = require('supertest')
const expect = require('chai').expect
const sinon = require('sinon')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { Staff } = require('../models')

// Mock sequelize staff model
sinon.stub(Staff, 'create') // Stub the create method of Staff model

describe('Staff API Tests', () => {
  
  beforeEach(() => {
    // Mock jwt.verify to always return a valid user
    sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
      callback(null, { id: 55, name: 'FiftyFive', userType: 'admin' }); // Mock valid user
    })
  })

  afterEach(() => {
    // Restore the original methods after each test
    jwt.verify.restore()
    Staff.create.reset()
  })

  it('should create a new staff record with valid data', async () => {
    const validData = {
      name: 'John Doe',
      jobTitle: 'Doctor',
      roleId: 1,
      contact: '1234567890',
      department: 'Surgery'
    }

    // Mock Sequelize to return a successful record creation
    Staff.create.resolves({
      id: 1,
      ...validData
    })

    const res = await request(app)
      .post('/api/staffs')
      .set('Authorization', 'Bearer mockToken') 
      .send(validData)

    expect(res.statusCode).to.equal(201) // Check that it returns status 201
    expect(res.body.data).to.have.property('id') // Expect the response to have an ID
    expect(Staff.create.calledOnce).to.be.true // Ensure Staff.create was called
    expect(Staff.create.args[0][0]).to.deep.equal(validData) // Check data passed to create
  })

  it('should return an error for invalid data', async () => {
    const invalidData = {
      name: '', // Name is missing
      roleId: 1,
      jobTitle: 'Doctor',
      department: 'Surgery',
      contact: '12345' // Invalid contact number (less than 10 digits)
    }

    // Mock Sequelize to throw a validation error
    Staff.create.rejects(new Error('Name, role and contact are required'))

    const res = await request(app)
      .post('/api/staffs')
      .set('Authorization', 'Bearer mockToken') 
      .send(invalidData)

    expect(res.statusCode).to.equal(400) // Expect Bad Request status
    expect(res.body.message).to.equal('Name, role and contact are required') // Expected validation message
    expect(Staff.create.calledOnce).to.be.false
  })

  it('should return error for duplicate staff record', async () => {
    const duplicateData = {
      name: 'Jane Doe',
      roleId: 1,
      jobTitle: 'Nurse',
      contact: '9012345678',
      department: 'Emergency'
    }

    // First create mock resolves
    Staff.create.onFirstCall().resolves({
      id: 1,
      ...duplicateData
    })

    // Then simulate a duplicate record error for the second call
    Staff.create.onSecondCall().rejects({
      name: 'SequelizeUniqueConstraintError',
      errors: [
        {
          message: 'Staff already exists. Please try with another contact number',
        }
      ],
    })

    // First request should succeed
    await request(app)
      .post('/api/staffs')
      .set('Authorization', 'Bearer mockToken')
      .send(duplicateData)

    // Second request should fail with a duplicate error
    const res = await request(app)
      .post('/api/staffs')
      .set('Authorization', 'Bearer mockToken')
      .send(duplicateData)

    expect(res.statusCode).to.equal(409) // Expect 409 Conflict for duplicate record
    expect(res.body.message).to.equal('Staff already exists. Please try with another contact number') // Check for the duplicate error
  })
})
