const { body, validationResult } = require('express-validator');
const Controller_Of_BusinessesMongoose = require('../model/Bussinesses_info');
const fs = require('fs');
const fsp = require('fs/promises');
// const sharp = require('sharp');
const path = require('path');
const crypto = require('crypto')


class Controller_Of_SignUpPagesFormValidationController {

    static SingupBusinessNameAndCategoryValidtion = [
        body("business_name")
            .escape()
            .exists({ checkFalsy: true }).withMessage('Business name is required')
            .trim().isLength({ min: 2 }).withMessage('Busness name must be more then 1 letter')
            .isString().withMessage('Business name must be valid text')
            .matches(/^[\p{L}0-9\s&'.\-–—,:\/()_`’‘“”]+$/u).withMessage('Business name contains invalid characters')
            .not().matches(/^[\d\s]+$/).withMessage('Business name cannot be just numbers')


        ,
        body('business_category')
            .exists({ checkFalsy: true }).withMessage('Business category is required')
            .trim().isLength({ min: 2 }).withMessage("Busness category must be more then 1 letter")
            .isString().withMessage('Business category must be valid text')
            .matches(/^[\p{L}0-9\s&'.\-–—,:\/()_`’‘“”]+$/u).withMessage('Business category contains invalid characters')
            .not().matches(/^[\d\s]+$/).withMessage('Business category cannot be just numbers')
        ,


        (req, res, next) => {

            const errors = validationResult(req);
            let businessNameErrorList = []
            let businessCategoryErrorList = []
            const businessNameValue = req.body.business_name
            console.log(businessNameValue);
            const businessCategoryValue = req.body.business_category
            if (!errors.isEmpty()) {
                errors.array().forEach(error => {
                    if (error.path == 'business_name') {
                        businessNameErrorList.push(error.msg)

                    }

                    if (error.path == 'business_category') {
                        businessCategoryErrorList.push(error.msg)

                    }

                })
                businessNameErrorList.push('')
                businessCategoryErrorList.push('')

                return res.render("sign_up.ejs", {
                    businessNameErrorList,
                    businessCategoryErrorList,
                    businessNameValue,
                    businessCategoryValue
                });

            }
            else {
                businessCategoryErrorList = ''
                businessNameErrorList = ''
                next();
            }

        }
    ];
    static SingupBusinessIndustryAndDescriptionValidtion = [
        body('businessIndustry')
            .exists({ checkFalsy: true }).withMessage('Business industry is required')
            .trim().isLength({ min: 2 }).withMessage("Business industry name must be more then 1 letter")
            .isString().withMessage('Business industry must be valid text')
            .not().matches(/^[\d\s]+$/).withMessage('Business industry cannot be just numbers')
            .matches(/^[\p{L}0-9\s&'.\-–—,:\/()_`’‘“”]+$/u).withMessage('Business industry contains invalid characters')
        ,
        body('businessDescription')
            .exists({ checkFalsy: true }).withMessage('Business description is required')
            .not().matches(/^[\d\s]+$/).withMessage('Business description cannot be just numbers')
            .isString().withMessage('Business description must be valid text')
            .matches(/^[\p{L}0-9\s.,'"’‘“”!?()_&\-–—:;%$@\/\\[\]{}+=*#°…|`~^<>]*$/u).withMessage('Description contains invalid characters')

            .custom((value) => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount >= 10;
            }).withMessage("Business description must be more than 10 words"),

        (req, res, next) => {
            const businessIndustryValue = req.body.businessIndustry
            const businessDescriptionValue = req.body.businessDescription

            const errors = validationResult(req)
            let businessDescriptionError = []
            let businessIndustryError = []


            if (!errors.isEmpty()) {

                errors.errors.forEach(error => {

                    if (error.path == 'businessDescription') {
                        businessDescriptionError.push(error.msg)
                    }
                    if (error.path == 'businessIndustry') {
                        businessIndustryError.push(error.msg)

                    }

                });
                businessDescriptionError.push('')
                businessIndustryError.push('')
                console.log(businessDescriptionError);
                console.log(businessIndustryError);
                return res.render('signup_Industry_Description', {
                    businessIndustryValue,
                    businessDescriptionValue,
                    businessDescriptionError,
                    businessIndustryError
                })
            } else {
                next()

            }

        }
    ]
    static SingupBusinessAddressAndProfileAndTimeAndHoildaysValidtion = [
        body('SignubusinessAddress')
            .exists({ checkFalsy: true }).withMessage('Business address is required')
            .not().matches(/^[\d\s]+$/).withMessage('Business address cannot be just numbers')
            .isString().withMessage('Business address must be valid text')
            .trim().isLength({ min: 2 }).withMessage("Business address must be more then 1 letter")
            .matches(/^[\p{L}0-9\s,.\-/#&():'"’‘“”]+$/u).withMessage('Business address contains invalid characters'),
        body('SignupbusinessOpenTime')
            .exists({ checkFalsy: true }).withMessage('Open time is required')
            .isString().withMessage('Open time must be valid text')
            .matches(/^((0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)|(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/i)
            .withMessage('Open time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format'),

        body('SignupbusinessCloseTime')
            .exists({ checkFalsy: true }).withMessage('Close time is required')
            .isString().withMessage('Close time must be valid text')
            .matches(/^((0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)|(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/i)
            .withMessage('Close time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format'),

        body('businessHoliday')
            .exists({ checkFalsy: true }).withMessage('please select holiday or None'),

        (req, res, next) => {
            const errors = validationResult(req).array();
            const SignupBusinessProfileError = req.BusinessProfileValidationError
            let holidays = req.body.businessHoliday

            // Validation

            const TheSignupATHEnteredVlaues = {
                SignupbusinesAddress: req.body.SignubusinessAddress,
                SignupbusinessOpenTime: req.body.SignupbusinessOpenTime,
                SignupbusinessCloseTime: req.body.SignupbusinessCloseTime,
                SignupbusinessHolidays: []
            }

            if (!holidays || holidays.length === 0) {
                errors.push({
                    msg: 'Please select holiday or None',
                    path: 'businessHoliday',

                });
            }

            if (typeof holidays === 'string') {
                holidays = [holidays];
            } else if (!Array.isArray(holidays)) {
                errors.push({
                    msg: 'Invalid data entered',
                    path: 'businessHoliday',
                });
            }
            if (Array.isArray(holidays)) {
                holidays.forEach(element => {
                    if (element.trim() === '') {
                        errors.push({
                            msg: 'Invalid data entered',
                            path: 'businessHoliday',

                        });
                    }
                });

                if (holidays.includes('None') && holidays.length > 1) {
                    errors.push({
                        msg: 'Cannot select "None" with other days',
                        path: 'businessHoliday',

                    });
                }
                const ValidDays = ["None", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                holidays.forEach(days => {
                    if (!ValidDays.includes(days)) {
                        errors.push({
                            msg: 'Invalid data entered',
                            path: 'businessHoliday',
                        });
                    } else TheSignupATHEnteredVlaues['SignupbusinessHolidays'].push(days)

                });
            }


            let TheSignupAddressProfileTimeAndHolidayError = {
                addressError: [],
                profileError: [],
                openTimeError: [],
                closeTimeError: [],
                holidayError: [],
            }
            // ✅ Only show one file error
            if (SignupBusinessProfileError != '') {
                errors.push({
                    msg: SignupBusinessProfileError,
                    path: 'business_profile',
                });
            } else if (req.file == undefined) {
                errors.push({
                    msg: 'Business profile is required',
                    path: 'business_profile',
                });
            }

            if (errors.length != 0) {
                errors.forEach(error => {
                    if (error.path == 'SignubusinessAddress') {
                        TheSignupAddressProfileTimeAndHolidayError['addressError'].push(error.msg)
                    }
                    if (error.path == 'business_profile') {
                        TheSignupAddressProfileTimeAndHolidayError['profileError'].push(error.msg)
                    }
                    if (error.path == 'SignupbusinessOpenTime') {
                        TheSignupAddressProfileTimeAndHolidayError['openTimeError'].push(error.msg)
                    }
                    if (error.path == 'SignupbusinessCloseTime') {
                        TheSignupAddressProfileTimeAndHolidayError['closeTimeError'].push(error.msg)
                    }
                    if (error.path == 'businessHoliday') {
                        TheSignupAddressProfileTimeAndHolidayError['holidayError'].push(error.msg)
                    }
                });
                TheSignupAddressProfileTimeAndHolidayError['addressError'].push('')
                TheSignupAddressProfileTimeAndHolidayError['profileError'].push('')
                TheSignupAddressProfileTimeAndHolidayError['openTimeError'].push('')
                TheSignupAddressProfileTimeAndHolidayError['closeTimeError'].push('')
                TheSignupAddressProfileTimeAndHolidayError['holidayError'].push('')
                if (req.file) {
                    const fileRmoveIfErrorExist = path.join(__dirname, `../${req.file.path}`);
                    fs.unlink(fileRmoveIfErrorExist, err => {
                        if (err) {
                            console.log(err);
                        } else console.log('file deleted');
                    })

                } else console.log('file dose not upload successfully');
                console.log(TheSignupAddressProfileTimeAndHolidayError);


                return res.render('signup_address_image_time_holiday.ejs', {
                    TheSignupAddressProfileTimeAndHolidayError,
                    TheSignupATHEnteredVlaues,
                })

            } else {
                next()
            }

        }
    ]
    static SingupBusinessOwnerInfoValidtion = [
        body("Signup_business_owner_firstName")
            .exists({ checkFalsy: true }).withMessage('First name is required')
            .isString().withMessage('First name must be valid text')
            .trim().isLength({ min: 2 }).withMessage("First name must be more then 1 letter")
            .not().matches(/^\d+$/).withMessage('First name cannot be just numbers')
            .matches(/^[\p{L}\s'.\-'"’‘“”]+$/u).withMessage('First name contains invalid characters'),

        body('Signup_business_owner_lastName')
            .exists({ checkFalsy: true }).withMessage('Last name is required')
            .isString().withMessage('Last name must be valid text')
            .trim().isLength({ min: 2 }).withMessage("Last name must be more then 1 letter")
            .not().matches(/^\d+$/).withMessage('Last name cannot be just numbers')
            .matches(/^[\p{L}\s'.\-'"’‘“”]+$/u).withMessage('Last name contains invalid characters'),
        (req, res, next) => {
            const errror = validationResult(req).array()
            const TheSignupBusinessInfoError = {
                firstNameError: [],
                lastNameError: [],
            }

            if (errror.length != 0) {
                errror.forEach(TheError => {
                    if (TheError.path == 'Signup_business_owner_firstName') {
                        TheSignupBusinessInfoError['firstNameError'].push(TheError.msg)
                    }
                    if (TheError.path == 'Signup_business_owner_lastName') {
                        TheSignupBusinessInfoError['lastNameError'].push(TheError.msg)
                    }
                });
                TheSignupBusinessInfoError['firstNameError'].push('')
                TheSignupBusinessInfoError['lastNameError'].push('')
                let TheSignupBusinessOI = {
                    firstName: req.body.Signup_business_owner_firstName,
                    lastName: req.body.Signup_business_owner_lastName,
                }
                return res.render('signup_business_owner_info', { TheSignupBusinessInfoError, TheSignupBusinessOI })
            } else {
                next()
            }

        }
    ]
    static SingupBusinessPhoneNumberAndEmailAddressValidtion = [
        body("business_phone_number")
            .trim().notEmpty().withMessage("Phone number is required")
            .trim().matches(/^\+?[0-9]{10,15}$/).withMessage("Enter a valid phone number (10-15 digits)"),

        body('business_email')
            .trim().notEmpty().withMessage('Email address is required')
            .trim().isEmail().withMessage("Enter a valid email address"),

        (req, res, next) => {
            const errors = validationResult(req).array()
            let ThePNAndEAError = {
                phoneNumberError: [],
                emailAddressError: []
            }
            const ThePNAndEAEnteredValue = {
                phoneNumber: req.body.business_phone_number,
                emailAddress: req.body.business_email
            }
            if (errors.length != 0) {
                errors.forEach(TheError => {
                    if (TheError.path == 'business_phone_number') {
                        ThePNAndEAError['phoneNumberError'].push(TheError.msg)
                    }
                    if (TheError.path == 'business_email') {
                        ThePNAndEAError['emailAddressError'].push(TheError.msg)
                    }

                });
                ThePNAndEAError['phoneNumberError'].push('')
                ThePNAndEAError['emailAddressError'].push('')
                return res.render('signup_PhoneNumber_EmailAdress.ejs', { ThePNAndEAError, ThePNAndEAEnteredValue })
            } else {
                next()
            }

        }
    ]
    static SingupBusinessNumberAndEmailOTPValidtion = [
        body("emailOTP")
            .trim().notEmpty().withMessage("Email address OTP is required")
            .trim().matches(/^\d{6}$/).withMessage("Enter valid OTP (6 digits)"),

        body("phoneNumberOTP")
            .trim().notEmpty().withMessage("Phone number OTP is required")
            .trim().matches(/^\d{6}$/).withMessage("Enter valid OTP (6 digits)"),

        (req, res, next) => {
            const errors = validationResult(req).array()
            let TheSignupPNAndEAValuesAndError = {
                emailOTPError: [],
                emailOTPValue: req.body.emailOTP,
                numberOTPError: [],
                numberOTPValue: req.body.phoneNumberOTP,
            }
            if (errors.length != 0) {
                errors.forEach(TheErrorAndValue => {
                    if (TheErrorAndValue.path === 'emailOTP') {
                        TheSignupPNAndEAValuesAndError['emailOTPError'].push(TheErrorAndValue.msg)
                    }
                    if (TheErrorAndValue.path === 'phoneNumberOTP') {
                        TheSignupPNAndEAValuesAndError['numberOTPError'].push(TheErrorAndValue.msg)
                    }
                });
                TheSignupPNAndEAValuesAndError['emailOTPError'].push('')
                TheSignupPNAndEAValuesAndError['numberOTPError'].push('')
                return res.render('signup_OTPVerification.ejs', { TheSignupPNAndEAValuesAndError })
            } else {
                next()
            }
        }
    ]
    static SingupBusinessPasswordAndConfirmValidtion = [
        body('Signup_password')
            .trim().notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[0-9]/).withMessage('Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
        body('Signup_confirm_password')
            .trim().notEmpty().withMessage('Confirm password is required')
            .custom((value, { req }) => {
                if (value !== req.body.Signup_password) {
                    throw new Error('Confirm password does not match password');
                }
                return true;
            }),

        (req, res, next) => {
            const errors = validationResult(req).array()
            let TheSignupPAndPCValuesAndError = {
                passwordError: [],
                passwordValue: req.body.Signup_password,
                confirmPasswordError: [],
                confirmPasswordValue: req.body.Signup_confirm_password,
            }
            if (errors.length != 0) {
                errors.forEach(TheErrorAndValue => {
                    if (TheErrorAndValue.path === 'Signup_password') {
                        TheSignupPAndPCValuesAndError['passwordError'].push(TheErrorAndValue.msg)
                    }
                    if (TheErrorAndValue.path === 'Signup_confirm_password') {
                        TheSignupPAndPCValuesAndError['confirmPasswordError'].push(TheErrorAndValue.msg)
                    }
                });
                TheSignupPAndPCValuesAndError['passwordError'].push('')
                TheSignupPAndPCValuesAndError['confirmPasswordError'].push('')
                return res.render('signup_password.ejs', { TheSignupPAndPCValuesAndError })
            } else {
                next()
            }
        }
    ]
    static SingupBusinessUsernameValidtion = [
        body('SignupUsername')
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 15 }).withMessage('Username must be 3-15 characters long')
            .custom(value => {
                if (value.includes(' ')) {
                    throw new Error('Spaces are not allowed in the username');
                }
                return true;
            })
            .matches(/^[a-zA-Z0-9_]+$/).withMessage('Only letters, numbers, and underscores are allowed'),
        async (req, res, next) => {
            const errors = validationResult(req).array()
            let TheSignupUsernameValuesAndError = {
                UsernameError: [],
                UsernameValue: req.body.SignupUsername,
            }
            const TheUsername = await Controller_Of_BusinessesMongoose.getAllUsername()
            if (TheUsername.includes(req.body.SignupUsername)) {
                errors.push({
                    msg: 'This username is already taken',
                    path: 'SignupUsername',
                });
            }


            if (errors.length != 0) {
                errors.forEach(TheErrorAndValue => {
                    if (TheErrorAndValue.path === 'SignupUsername') {
                        TheSignupUsernameValuesAndError['UsernameError'].push(TheErrorAndValue.msg)
                    }

                });
                TheSignupUsernameValuesAndError['UsernameError'].push('')

                return res.render('signup_username.ejs', { TheSignupUsernameValuesAndError })
            } else {
                next()
            }

        }
    ]
    static BusinessProfileSharpValidation = [
        async (req, res, next) => {
            next()
            // sudo apt update && sudo apt install -y \
            // libvips-dev \
            // build-essential \
            // pkg-config

            // let errors = [];

            // const inputFilePath = path.resolve(req.file.path);
            // const fileExt = path.extname(inputFilePath);
            // const fileNameWithoutExt = path.basename(inputFilePath, fileExt);
            // const outputFileName = `${Date.now()}-${fileNameWithoutExt}.jpeg`;
            // const outputFilePath = path.resolve(`temp_uploads/${outputFileName}`);

            // console.log(outputFilePath);

            // // === Ensure imange path ===
            // if (!fs.existsSync(inputFilePath)) {
            //     errors.push(`Input file not found: ${inputFilePath}`)
            // } else {


            //     // === Validate and Resize ===
            //     async function validateAndResize(inputPath, outputPath) {
            //         try {
            //             const metadata = await sharp(inputPath).metadata();
            //             console.log(`✅ Valid image detected: ${metadata.format}, ${metadata.width}x${metadata.height}`);

            //             await sharp(inputPath)
            //                 .resize(300, 300)
            //                 .png({ quality: 90 }) // You can skip this if it's already PNG
            //                 .toFile(outputPath);

            //             console.log(`✅ Resized image saved at: ${outputPath}`);
            //             if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
            //         } catch (error) {
            //             errors.push(`Error during processing: ${error.message}`)
            //         }
            //     }
            //     // === Run the function ===
            //     await validateAndResize(inputFilePath, outputFilePath);
            // }

            // if (errors.length === 0) {
            //     next()
            // } else {
            //     // Delete original and output if any error occurs
            //     if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
            //     if (fs.existsSync(outputFilePath)) fs.unlinkSync(outputFilePath);

            //     return res.status(400).json({ error: errors[0] });
            // }


        }
    ]
}


module.exports = Controller_Of_SignUpPagesFormValidationController