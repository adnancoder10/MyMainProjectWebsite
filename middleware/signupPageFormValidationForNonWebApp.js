const {body, validationResult} = require('express-validator')
const fs = require('fs');
const Controller_Of_BusinessesMongoose = require('../model/Bussinesses_info');
const path = require('path');
const { log } = require('console');


class Validation_OF_NonWeb_app{
    static SingupFormValidation_OF_NonWeb_App = [
        body('SignupBusinessNameInput')
            .exists({ checkFalsy: true }).withMessage('Business name is required')
            .trim().isLength({ min: 2 }).withMessage('Business name must be more then 1 letter')
            .isString().withMessage('Business name must be valid text')
            .matches(/^[\p{L}0-9\s&'.\-–—,:\/()`’‘“”]+$/u).withMessage('Business name contains invalid characters')
            .not().matches(/^[\d\s]+$/).withMessage('Business name cannot be just numbers')            
        ,
        body('SignupBusinessCategoryInput')
            .exists({ checkFalsy: true }).withMessage('Business category is required')
            .trim().isLength({ min: 2 }).withMessage("Business category must be more then 1 letter")
            .isString().withMessage('Business category must be valid text')
            .not().matches(/^[\d\s]+$/).withMessage('Business category cannot be just numbers')
            .matches(/^[\p{L}0-9\s&'.\-–—,:\/()`’‘“”]+$/u).withMessage('Business category contains invalid characters')
        ,
        body('SignupBusinessIndustryInput')
            .exists({ checkFalsy: true }).withMessage('Business industry is required')
            .trim().isLength({ min: 2 }).withMessage("Business industry name must be more then 1 letter")
            .isString().withMessage('Business industry must be valid text')
            .not().matches(/^[\d\s]+$/).withMessage('Business industry cannot be just numbers')
            .matches(/^[\p{L}0-9\s&'.\-.,:/()]+$/u).withMessage('Business industry contains invalid characters')
        ,
        body('SignupBusinessDescriptionInput')
            .exists({ checkFalsy: true }).withMessage('Business description is required')
            .not().matches(/^[\d\s]+$/).withMessage('Business description cannot be just numbers')
            .isString().withMessage('Business description must be valid text')
            .matches(/^[\p{L}0-9\s.,'"’‘“”!?()&\-–—:;%$@\/\\[\]{}+=*#°…|`~^<>]*$/u).withMessage('Description contains invalid characters')
            .custom((value) => {
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount >= 10;
            }).withMessage("Business description must be more than 10 words")
      
        ,
        body('SignupBusinessAddressInput')
            .exists({ checkFalsy: true }).withMessage('Business address is required')
            .not().matches(/^[\d\s]+$/).withMessage('Business address cannot be just numbers')
            .isString().withMessage('Business address must be valid text')
            .trim().isLength({ min: 2 }).withMessage("Business address must be more then 1 letter")
            .matches(/^[\p{L}0-9\s,.\-/#&():'"’‘“”]+$/u).withMessage('Business address contains invalid characters')
        ,
        body('SignupBusinessOpenTimeInput')
            .exists({ checkFalsy: true }).withMessage('Open time is required')
            .isString().withMessage('Open time must be valid text')
            .matches(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):?\s*(am|pm)?$/i).withMessage('Open time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format')
        ,
        body('SignupBusinessCloseTimeInput')
            .exists({ checkFalsy: true }).withMessage('Close time is required')
            .isString().withMessage('Close time must be valid text')
            .matches(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):?\s*(am|pm)?$/i).withMessage('Close time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format')
        ,
        body('SignupBusinessHolidaysInput')
            .exists({ checkFalsy: true }).withMessage('Please select holiday or None')
        ,
        body('SignupBusinessOwnerFirstNameInput')
            .exists({ checkFalsy: true }).withMessage('First name is required')
            .isString().withMessage('First name must be valid text')
            .trim().isLength({ min: 2 }).withMessage("First name must be more then 1 letter")
            .not().matches(/^\d+$/).withMessage('First name cannot be just numbers')
            .matches(/^[\p{L}\s'.\-'"’‘“”]+$/u).withMessage('First name contains invalid characters')
        ,
        body('SignupBusinessOwnerLastNameInput')
            .exists({ checkFalsy: true }).withMessage('Last name is required')
            .isString().withMessage('Last name must be valid text')
            .trim().isLength({ min: 2 }).withMessage("Last name must be more then 1 letter")
            .not().matches(/^\d+$/).withMessage('Last name cannot be just numbers')
            .matches(/^[\p{L}\s'.\-'"’‘“”]+$/u).withMessage('Last name contains invalid characters')
        ,
        body('SignupBusinessPhoneNumberInput')
            .exists({ checkFalsy: true }).withMessage("Phone number is required")
            .isString().withMessage("Phone number format is not valid")
            .matches(/^(\+)?\d{1,4}(?:-?\s?(?:\(\d+\)|\d+)){1,5}$/)
                .withMessage("Enter a valid phone number")
            .custom(value => {
              const digitsOnly = value.replace(/\D/g, '');
              if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                throw new Error('Phone number must have between 7 and 15 digits');
              }
              return true;
            })
        ,
        body('SignupBusinessEmailAddressInput')
            .exists({ checkFalsy: true }).withMessage('Email address is required')
            .isString().withMessage('Email address must be valid text')
            .isEmail().withMessage('Enter address a valid email address')
            .isLength({ max: 100 }).withMessage('Email address must be at most 100 characters long')
        ,
        body('SignupBusinessPhoneNumberOTPInput')
            .exists({ checkFalsy: true }).withMessage("Phone number OTP is required")
            .trim().matches(/^\d{6}$/).withMessage("Enter valid OTP (6 digits)")
        ,
        body('SignupBusinessEmailAddressOTPInput')
            .exists({ checkFalsy: true }).withMessage("Email address OTP is required")
            .trim().matches(/^\d{6}$/).withMessage("Enter valid OTP (6 digits)")
        ,
        body('SignupBusinessPassWordInput')
            .exists({ checkFalsy: true }).withMessage('Password is required')
            .isString().withMessage('Password must be valid text')
            .trim()
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/\d/).withMessage('Password must contain at least one number')
            .matches(/[@$!%*?&#^()_\-+=]/).withMessage('Password must contain at least one special character')
        ,
        body('SignupBusinessConfirmPasswordInput')
            .exists({ checkFalsy: true }).withMessage('Confirm password is required')
            .custom((value, { req }) => {
                if (value !== req.body.SignupBusinessPassWordInput) {
                    throw new Error('Confirm password does not match password');
                }
                return true;
            })
        ,
        body('SignupBusinessUsernameInput')
            .exists({ checkFalsy: true }).withMessage('Username is required')
            .isString().withMessage('Username must be text')
            .trim()
            .isLength({ min: 3, max: 15 }).withMessage('Username must be 3-15 characters long')
            .custom(value => {
                if (value.includes(' ')) {
                  throw new Error('Spaces are not allowed in the username');
                }
                return true;
            })
            .matches(/^[\p{L}0-9_.-]+$/u).withMessage('Username can only contain letters, numbers, underscores, dots, and hyphens')
        ,
        async (req, res, next)=>{
            const errors = validationResult(req).array()
            let TheErrorsOfServerForSignup = {}
            console.log(TheErrorsOfServerForSignup);
            
            // ✅ Only show one file error
            const SignupBusinessProfileError = req.BusinessProfileValidationError

            const TheUsername = await Controller_Of_BusinessesMongoose.getAllUsername()
            if (TheUsername.includes(req.body.SignupBusinessUsernameInput)) {  
                errors.push({
                    msg: 'This username is already taken',
                    path: 'SignupBusinessUsernameInput',
                });
                console.log('This username taken');
            }else console.log('You username is fine');

            
            console.log('Now go', SignupBusinessProfileError);
            if (SignupBusinessProfileError != '') {
                errors.push({
                    msg: SignupBusinessProfileError,
                    path: 'SignupBusinessProfile',
                });
            } else if (!req.file) {
                errors.push({
                    msg: 'Business profile is required',
                    path: 'SignupBusinessProfile',
                });
            }
            // Business holidays error hendling
            let holidays = req.body.SignupBusinessHolidaysInput
            if (typeof holidays ===  'string'){
                holidays = [holidays]
            }else if (!Array.isArray(holidays)){
                errors.push({
                    msg: 'Invalid data entered',
                    path: 'SignupBusinessHolidaysInput',
                });
            }
            if (Array.isArray(holidays)){
                holidays.forEach(element => {
                    if (element.trim() === '') {
                        errors.push({
                            msg: 'Invalid data entered',
                            path: 'SignupBusinessHolidaysInput',

                        });
                    }
                });

                if (holidays.includes('None') && holidays.length > 1) {
                    errors.push({
                        msg: 'Cannot select "None" with other days',
                        path: 'SignupBusinessHolidaysInput',

                    });
                }
                const ValidDays = ["None", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                holidays.forEach(days => {
                    if (!ValidDays.includes(days)) {
                        errors.push({
                            msg: 'Invalid data entered',
                            path: 'SignupBusinessHolidaysInput',
                        });
                    }
                });
            
            }


            if (errors.length !== 0){
                console.log(errors);
                errors.forEach(TheErrors => {
                    if (TheErrors.path === 'SignupBusinessNameInput'){
                        if(!TheErrorsOfServerForSignup['BusinessNameError']) TheErrorsOfServerForSignup['BusinessNameError'] = []
                        TheErrorsOfServerForSignup['BusinessNameError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessCategoryInput'){
                        if(!TheErrorsOfServerForSignup['BusinessCategoryError']) TheErrorsOfServerForSignup['BusinessCategoryError'] = []
                        TheErrorsOfServerForSignup['BusinessCategoryError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessIndustryInput'){
                        if(!TheErrorsOfServerForSignup['BusinessIndustryError']) TheErrorsOfServerForSignup['BusinessIndustryError'] = []
                        TheErrorsOfServerForSignup['BusinessIndustryError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessDescriptionInput'){
                        if(!TheErrorsOfServerForSignup['BusinessDescriptionError']) TheErrorsOfServerForSignup['BusinessDescriptionError'] = []
                        TheErrorsOfServerForSignup['BusinessDescriptionError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessAddressInput'){
                        if(!TheErrorsOfServerForSignup['BusinessAddressError']) TheErrorsOfServerForSignup['BusinessAddressError'] = []
                        TheErrorsOfServerForSignup['BusinessAddressError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessProfile'){
                        if(!TheErrorsOfServerForSignup['BusinessProfileError']) TheErrorsOfServerForSignup['BusinessProfileError'] = []
                        TheErrorsOfServerForSignup['BusinessProfileError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessOpenTimeInput'){
                        if(!TheErrorsOfServerForSignup['BusinessOpenTimeError']) TheErrorsOfServerForSignup['BusinessOpenTimeError'] = []
                        TheErrorsOfServerForSignup['BusinessOpenTimeError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessCloseTimeInput'){
                        if(!TheErrorsOfServerForSignup['BusinessCloseTimeError']) TheErrorsOfServerForSignup['BusinessCloseTimeError'] = []
                        TheErrorsOfServerForSignup['BusinessCloseTimeError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessHolidaysInput'){
                        if(!TheErrorsOfServerForSignup['BusinessHolidaysError']) TheErrorsOfServerForSignup['BusinessHolidaysError'] = []
                        TheErrorsOfServerForSignup['BusinessHolidaysError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessOwnerFirstNameInput'){
                        if(!TheErrorsOfServerForSignup['BusinessOwnerFirstNameError']) TheErrorsOfServerForSignup['BusinessOwnerFirstNameError'] = []
                        TheErrorsOfServerForSignup['BusinessOwnerFirstNameError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessOwnerLastNameInput'){
                        if(!TheErrorsOfServerForSignup['BusinessOwnerLastNameError']) TheErrorsOfServerForSignup['BusinessOwnerLastNameError'] = []
                        TheErrorsOfServerForSignup['BusinessOwnerLastNameError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessPhoneNumberInput'){
                        if(!TheErrorsOfServerForSignup['BusinessPhoneNumberError']) TheErrorsOfServerForSignup['BusinessPhoneNumberError'] = []
                        TheErrorsOfServerForSignup['BusinessPhoneNumberError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessEmailAddressInput'){
                        if(!TheErrorsOfServerForSignup['BusinessEmailAddressError']) TheErrorsOfServerForSignup['BusinessEmailAddressError'] = []
                        TheErrorsOfServerForSignup['BusinessEmailAddressError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessPhoneNumberOTPInput'){
                        if(!TheErrorsOfServerForSignup['BusinessPhoneNumberOTPError']) TheErrorsOfServerForSignup['BusinessPhoneNumberOTPError'] = []
                        TheErrorsOfServerForSignup['BusinessPhoneNumberOTPError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessEmailAddressOTPInput'){
                        if(!TheErrorsOfServerForSignup['BusinessEmailAddressOTPError']) TheErrorsOfServerForSignup['BusinessEmailAddressOTPError'] = []
                        TheErrorsOfServerForSignup['BusinessEmailAddressOTPError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessPassWordInput'){
                        if(!TheErrorsOfServerForSignup['BusinessPassWordError']) TheErrorsOfServerForSignup['BusinessPassWordError'] = []
                        TheErrorsOfServerForSignup['BusinessPassWordError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessConfirmPasswordInput'){
                        if(!TheErrorsOfServerForSignup['BusinessConfirmPasswordError']) TheErrorsOfServerForSignup['BusinessConfirmPasswordError'] = []
                        TheErrorsOfServerForSignup['BusinessConfirmPasswordError'].push(TheErrors.msg)
                    }
                    if (TheErrors.path === 'SignupBusinessUsernameInput'){
                        if(!TheErrorsOfServerForSignup['BusinessUsernameError']) TheErrorsOfServerForSignup['BusinessUsernameError'] = []
                        TheErrorsOfServerForSignup['BusinessUsernameError'].push(TheErrors.msg)
                    }
                });
                if (req.file){
                    
                    if (!fs.existsSync(req.file.path)){
                        
                        fs.unlink(req.file.path, (err)=>{
                            if (err) {
                                console.error('Error deleting file:', err);
                                return;
                            }
                            console.log('File deleted successfully');
                        })
                    }
                }
                // console.log(TheErrorsOfServerForSignup);
                
                return res.status(400).json({ TheErrorsOfServerForSignup: TheErrorsOfServerForSignup }); 


            }else {
                const pathOfTempFile = path.join(__dirname, '../temp_uploads', `${req.file.filename}` );
                const nameOfFile = path.basename(pathOfTempFile)
                const destinationFolder = path.join(__dirname, '../UsersFiles/BusinessProfiles');
                const destinationPath = path.join(destinationFolder, nameOfFile);
                
                fs.renameSync(pathOfTempFile, destinationPath, (err)=>{
                    if (err) {
                        return console.error('Error moving file:', err);
                    }
                    console.log('File moved successfully!');
            })
                
                next()
            }
        }
    ]
}

module.exports = Validation_OF_NonWeb_app