const express = require('express')
const { Controller_Of_BusinessesController } = require('../controller/BusinessesController')
const { Controller_Of_HomeController } = require('../controller/HomeController')
const { Controller_Of_LogInController } = require('../controller/LogInController')
const { Controller_Of_ProductsContoller } = require('../controller/ProductsController')
const { Controller_Of_SignUpController } = require('../controller/SignUpController')
const Controller_Of_SignUpPagesFormValidationController = require('../middleware/signupPagesFormValidation')
const { SignupBusinessProfilesErrorHandler } = require('../uploads/upload_01')
const session = require('express-session')
const MongoSessionStore = require('connect-mongo')
const StepValidation_Of_Singup = require('../middleware/SignupStepValidation')
const Validation_OF_LoginPage = require('../middleware/LoginPageFormValidation')



const Router_01 = express.Router({mergeParams: true})

// session for signup page: ❌ A user shouldn’t be able to go to page 2 unless they have submitted page 1 correctly.


const sessionForSignupPages = session({
  secret: 'mySecretKey123',         // used to sign the session ID cookie (keep it private)
  resave: false,                    // don’t save session if nothing changed
  saveUninitialized: true,         // save new sessions (even if empty)
  store: MongoSessionStore.create({ // connecting mongo to save session
    mongoUrl: 'mongodb://localhost:27017/MyMainProjectSignupPagesSession',
    collectionName: 'SignupUsersSession',
    ttl: 60 * 30 // ⏰ 30 minutes in seconds
  }),
  cookie: {
    httpOnly: true,        // JS can't touch this cookie
    secure: false,         // Set this to true in production with HTTPS
    sameSite: 'strict', // even safer
    maxAge: 1000 * 60 * 30 // 30 minutes
  }
});
const sessionmultiAccountLoginDB = session({
  secret: 'mySecretKey123',         // used to sign the session ID cookie (keep it private)
  resave: false,                    // don’t save session if nothing changed
  saveUninitialized: true,         // save new sessions (even if empty)
  store: MongoSessionStore.create({ // connecting mongo to save session
    mongoUrl: 'mongodb://localhost:27017/multiAccountLoginDB',
    collectionName: 'SignupUsersSession', 
    ttl: 60 * 15 // ⏰ 15 minutes in seconds. How long the session is stored in MongoDB.
  }),
  cookie: {
    httpOnly: true,        // JS can't touch this cookie
    secure: false,         // Set this to true in production with HTTPS
    sameSite: 'strict', // even safer
    maxAge: 1000 * 60 * 15 // ⏰ 15 minutes in milliseconds.How long the cookie remains in the browser.

  }
});

Router_01.use('/login', sessionmultiAccountLoginDB)
Router_01.use('/signup', sessionForSignupPages)

Router_01.get('/', Controller_Of_HomeController.homePage)
Router_01.get('/businesses', Controller_Of_BusinessesController.BusinessPage)
Router_01.get('/products', Controller_Of_ProductsContoller.ProductsPage)

Router_01.get('/login', Controller_Of_LogInController.LogInGetRequest)
Router_01.post('/login',
  // Validation_OF_LoginPage.loginLimiter, 
  Validation_OF_LoginPage.formValidation, 
  Validation_OF_LoginPage.accountLoginBlocker, 
  Controller_Of_LogInController.LogInPostRequest)

Router_01.post('/login/select-account', Controller_Of_LogInController.multiAccountSelectionPostRequest)

Router_01.get('/signup', Controller_Of_SignUpController.SignUpPage)
Router_01.post('/signup', Controller_Of_SignUpPagesFormValidationController.SingupBusinessNameAndCategoryValidtion ,Controller_Of_SignUpController.SignUpPagePostRequest)


Router_01.get('/signup/industry_dec', StepValidation_Of_Singup.SingupBusinessNameAndCategoryStepRequired, Controller_Of_SignUpController.SignUpIndustryAndDescriptionPage)
Router_01.post('/signup/industry_dec',StepValidation_Of_Singup.SingupBusinessNameAndCategoryStepRequiredForPost, Controller_Of_SignUpPagesFormValidationController.SingupBusinessIndustryAndDescriptionValidtion ,Controller_Of_SignUpController.SignUpIndustryAndDescriptionPagePostRequest)

Router_01.get('/signup/address_image_time_holiday',StepValidation_Of_Singup.SingupBusinessIndustryAndDescriptionStepRequired ,Controller_Of_SignUpController.SignUpAddressAndImageAndTimeAndHolidayPage)
Router_01.post('/signup/address_image_time_holiday',
  StepValidation_Of_Singup.SingupBusinessIndustryAndDescriptionStepRequiredForPost,
  SignupBusinessProfilesErrorHandler,
  Controller_Of_SignUpPagesFormValidationController.SingupBusinessAddressAndProfileAndTimeAndHoildaysValidtion,
  Controller_Of_SignUpPagesFormValidationController.BusinessProfileSharpValidation, 
  Controller_Of_SignUpController.SignUpAddressAndImageAndTimeAndHolidayPagePostRequest
);

Router_01.get('/signup/business_owner_info',StepValidation_Of_Singup.SingupBusinessAddressAndImageTimeHolidayStepRequired ,Controller_Of_SignUpController.SignUpBusinessOwnerInfoPage)
Router_01.post('/signup/business_owner_info',StepValidation_Of_Singup.SingupBusinessAddressAndImageTimeHolidayStepRequiredForPost ,Controller_Of_SignUpPagesFormValidationController.SingupBusinessOwnerInfoValidtion ,Controller_Of_SignUpController.SignUpBusinessOwnerInfoPagePostRequest)

Router_01.get('/signup/phoneNumber_emailAdress',StepValidation_Of_Singup.SingupBusinessOwnerInfoStepRequired, Controller_Of_SignUpController.SignUpPhoneNumberEmailAdressPage)
Router_01.post('/signup/phoneNumber_emailAdress',StepValidation_Of_Singup.SingupBusinessOwnerInfoStepRequiredForPost ,Controller_Of_SignUpPagesFormValidationController.SingupBusinessPhoneNumberAndEmailAddressValidtion ,Controller_Of_SignUpController.SignUpPhoneNumberEmailAdressPagePostRequest)

Router_01.get('/signup/OPT_verification',StepValidation_Of_Singup.SingupBusinessPhoneNumberEmailAdressStepRequired , Controller_Of_SignUpController.SignupOTPVerificationPage)
Router_01.post('/signup/OPT_verification',StepValidation_Of_Singup.SingupBusinessPhoneNumberEmailAdressStepRequiredForPost,Controller_Of_SignUpPagesFormValidationController.SingupBusinessNumberAndEmailOTPValidtion ,Controller_Of_SignUpController.SignupOTPVerificationPagePostRequest)

Router_01.get('/signup/password',StepValidation_Of_Singup.SingupBusinessOPT_VerificationStepRequired,Controller_Of_SignUpController.SignupPasswordPage)
Router_01.post('/signup/password',StepValidation_Of_Singup.SingupBusinessOPT_VerificationStepRequiredForPost,Controller_Of_SignUpPagesFormValidationController.SingupBusinessPasswordAndConfirmValidtion ,Controller_Of_SignUpController.SignupPasswordPagePostRequest)

Router_01.get('/signup/username',StepValidation_Of_Singup.SingupBusinessPasswordStepRequired ,Controller_Of_SignUpController.SingupUsernamePage)
Router_01.post('/signup/username', 
  StepValidation_Of_Singup.SingupBusinessPasswordStepRequiredForPost, 
  Controller_Of_SignUpPagesFormValidationController.SingupBusinessUsernameValidtion , 
  Controller_Of_SignUpController.SingupCreateAccountOrShowError)

module.exports = Router_01
