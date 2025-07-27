const express = require('express')
const multer = require('multer')
const Controller_Of_NonWebApp = require('../controller/AppController_01')
const Validation_OF_NonWeb_app = require('../middleware/signupPageFormValidationForNonWebApp')
const { SignupBusinessProfilesErrorHandler } = require('../uploads/upload_01')
const Router_02 = express.Router({ mergeParams: true })



Router_02.get('/signup/api', (req, res) => {
  res.json({
    'FirstName': 'Adnan',
    'LastName': 'Khan',
    'Email': 'pcoder10@gmail.com',
    'Password': 'Adnan1011!'
  })
})
Router_02.post('/signup/api',SignupBusinessProfilesErrorHandler,
  Validation_OF_NonWeb_app.SingupFormValidation_OF_NonWeb_App,
  Controller_Of_NonWebApp.SignupPagesPostRequest)


module.exports = Router_02