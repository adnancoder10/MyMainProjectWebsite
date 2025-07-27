const { body, validationResult } = require("express-validator");
const rateLimit = require('express-rate-limit');
const { LoginAttempt } = require("../model/SchemaForOtherConnection");


class Validation_OF_LoginPage {
    static formValidation = [
        body('loginUsernameOrPhoneNumber')
            .exists({ checkFalsy: true }).withMessage('Username or phone number is required.')
        ,
        body('LoginPassword')
            .exists({ checkFalsy: true }).withMessage('Password is required.')
        ,
        (req, res, next)=>{
            const errors = validationResult(req).array()
            let TheLoginFormValuesAndError = {
                UsernameORPhoneNumberError: [],
                UsernameORPhoneNumberValue: req.body.loginUsernameOrPhoneNumber,
                PasswordError: [],
                PasswordValue: req.body.LoginPassword,
            }
            if (errors.length != 0) {
                errors.forEach(TheErrorAndValue => {
                    if (TheErrorAndValue.path === 'loginUsernameOrPhoneNumber') {
                        TheLoginFormValuesAndError['UsernameORPhoneNumberError'].push(TheErrorAndValue.msg)
                    }
                    if (TheErrorAndValue.path === 'LoginPassword') {
                        TheLoginFormValuesAndError['PasswordError'].push(TheErrorAndValue.msg)
                    }
                });
                TheLoginFormValuesAndError['UsernameORPhoneNumberError'].push('')
                TheLoginFormValuesAndError['PasswordError'].push('')
                return res.render('log_in.ejs', { TheLoginFormValuesAndError })
                
            } else {
                next()
            }
        }
    ]
    static loginLimiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minutes
        max: 5, // Limit each IP to 5 login requests per windowMs
        // message: "Too many login attempts. Please try again later.",
        handler: (req, res) => {
            let TheLoginFormValuesAndError = {
            UsernameORPhoneNumberError: [''],
            UsernameORPhoneNumberValue: '',
            PasswordError: [''],
            PasswordValue: '',
        }
        const rateLimitError = "Too many login attempts. Please try again later."
        res.render('log_in.ejs', { TheLoginFormValuesAndError,  rateLimitError})
        },

    });
    static accountLoginBlocker = async (req, res, next) => {
         // Define the maximum allowed failed attempts before blocking
        const MAX_FAILED_LOGIN_ATTEMPTS = 5;
        // This constant should match the one in your LoginAttempt model for accurate blocking time
        const ACCOUNT_BLOCK_DURATION_SECONDS = 60 * 60; // 1 hour
        const UsernameOrPhoneNumber = req.body.loginUsernameOrPhoneNumber
        console.log(UsernameOrPhoneNumber);
        
        try {
            // const loginAttempt = await LoginAttempt.findOne({ UsernameOrPhoneNumber: UsernameOrPhoneNumber });
            
            // if (loginAttempt && loginAttempt.attempt_value >= MAX_FAILED_LOGIN_ATTEMPTS) {
            //     return res.status(429).json({
            //         msg: `Too many login attempts for this account. Please try again later.`,
            // });}

        // If not blocked, allow the request to proceed
            next();
        } catch (err) {
            console.error('Error in accountLoginBlocker middleware:', err.message);
            next(err); // Pass the error to Express's global error handler
        }
   
    }

}


module.exports = Validation_OF_LoginPage