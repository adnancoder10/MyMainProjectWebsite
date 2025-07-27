const bcrypt = require('bcrypt')
const Controller_Of_BusinessesMongoose = require('../model/Bussinesses_info')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET_KEY_FOR_LOGIN;

class Controller_Of_SignUpController {
    static SignUpPage = (req, res) => {
        let businessNameErrorList = ['']
        let businessCategoryErrorList = ['']
        let businessNameValue = ''
        let businessCategoryValue = ''

        res.render('sign_up.ejs', {
            businessNameErrorList,
            businessCategoryErrorList,
            businessNameValue,
            businessCategoryValue
        })

    }
    static SignUpPagePostRequest = (req, res) => {
        const businessCategory = req.body.business_category
        const businessName = req.body.business_name

        res.cookie("business_industry", businessCategory);

        req.session.SingupBusinessNameAndCategoryStep = true
        req.session.SingupBusinssNameAndCategory = {
            Name: businessName,
            Category: businessCategory
        };

        res.redirect('/signup/industry_dec');
    }
    static SignUpIndustryAndDescriptionPage = (req, res) => {
        const businessIndustryValue = ''
        const businessDescriptionValue = ''
        const businessDescriptionError = ['']
        const businessIndustryError = ['']


        res.render('signup_Industry_Description.ejs', {
            businessIndustryValue,
            businessDescriptionValue,
            businessDescriptionError,
            businessIndustryError
        })
    }
    static SignUpIndustryAndDescriptionPagePostRequest = (req, res) => {
        const businessIndustry = req.body.businessIndustry
        const businessDescription = req.body.businessDescription

        req.session.SingupBusinessIndustryAndDescriptionStep = true
        req.session.SingupBusinessIndustryAndDescription = {
            Industry: businessIndustry,
            Description: businessDescription,
        };


        res.redirect('/signup/address_image_time_holiday')
    }
    static SignUpAddressAndImageAndTimeAndHolidayPage = (req, res) => {
        let TheSignupAddressProfileTimeAndHolidayError = {
            addressError: [''],
            profileError: [''],
            openTimeError: [''],
            closeTimeError: [''],
            holidayError: [''],
        }
        const TheSignupATHEnteredVlaues = {
            SignupbusinesAddress: '',
            SignupbusinessOpenTime: "08:00",
            SignupbusinessCloseTime: "16:00",
            SignupbusinessHolidays: []

        }
        res.render('signup_address_image_time_holiday.ejs', { TheSignupAddressProfileTimeAndHolidayError, TheSignupATHEnteredVlaues })
    }
    static SignUpAddressAndImageAndTimeAndHolidayPagePostRequest = (req, res) => {
        const businessProfile = req.file.filename
        const businessAddress = req.body.SignubusinessAddress
        let businessHoliday = req.body.businessHoliday
        const businessOpenTime = req.body.SignupbusinessOpenTime
        const businessCloseTime = req.body.SignupbusinessCloseTime
        if (!Array.isArray(businessHoliday)) businessHoliday = [businessHoliday]

        req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTimeStep = true
        req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime = {
            Profile: `${businessProfile}`,
            Address: businessAddress,
            Holidays: businessHoliday,
            OpenTime: businessOpenTime,
            CloseTime: businessCloseTime
        };

        // console.log(business_profile);
        console.log(req.file.filename);
        // console.log(businessAddress);
        // console.log(business_profile);
        // upload.Signle('business_profile')
        console.log(businessOpenTime);
        // const [hour, minute] = businessOpenTime.split(':');
        // let hourInt = parseInt(hour);
        // let period;

        // if (hourInt >= 12) {
        //     period = 'PM';
        //     console.log(hourInt);
        // } else {
        //     period = 'AM';
        // }

        // // Convert to 12-hour format
        // // hourInt = hourInt % 12 || 12;
        // hourInt = hourInt % 12;
        //     if (hourInt === 0) {
        //     hourInt = 12;
        // }

        // const time12Hour = `${hourInt}:${minute} ${period}`;

        // console.log('Time in 12-hour format:', time12Hour);
        // res.send(`Received time: ${time12Hour}`);
        res.redirect('/signup/business_owner_info')
    }
    static SignUpBusinessOwnerInfoPage = (req, res) => {
        let TheSignupBusinessInfoError = {
            firstNameError: [''],
            lastNameError: [''],
        }
        let TheSignupBusinessOI = {
            firstName: '',
            lastName: '',
        }

        res.render('signup_business_owner_info.ejs', { TheSignupBusinessInfoError, TheSignupBusinessOI })
    }
    static SignUpBusinessOwnerInfoPagePostRequest = (req, res) => {
        const businessOwnerFistName = req.body.Signup_business_owner_firstName
        const businessOwnerLastName = req.body.Signup_business_owner_lastName

        req.session.SingupBusinessOwnerFirstNameAndLastNameStep = true
        req.session.SingupBusinessOwnerFirstNameAndLastName = {
            FirstName: businessOwnerFistName,
            LastName: businessOwnerLastName
        };

        res.redirect('/signup/phoneNumber_emailAdress')
    }
    static SignUpPhoneNumberEmailAdressPage = (req, res) => {
        let ThePNAndEAError = {
            phoneNumberError: [''],
            emailAddressError: ['']
        }
        let ThePNAndEAEnteredValue = {
            phoneNumber: '',
            emailAddress: ''
        }
        res.render('signup_PhoneNumber_EmailAdress.ejs', { ThePNAndEAError, ThePNAndEAEnteredValue })
    }
    static SignUpPhoneNumberEmailAdressPagePostRequest = (req, res) => {
        const businessPhoneNumber = req.body.business_phone_number
        const businessEmailAddress = req.body.business_email
        req.session.SingupBusinessPhoneNumberAndEmailAddressStep = true
        req.session.SingupBusinessPhoneNumberAndEmailAddress = {
            PhoneNumber: businessPhoneNumber,
            EmailAddress: businessEmailAddress
        };

        res.redirect('/signup/OPT_verification')

    }
    static SignupOTPVerificationPage = (req, res) => {
        let TheSignupPNAndEAValuesAndError = {
            emailOTPError: [''],
            emailOTPValue: '',
            numberOTPError: [''],
            numberOTPValue: '',
        }
        res.render('signup_OTPVerification.ejs', { TheSignupPNAndEAValuesAndError })
    }
    static SignupOTPVerificationPagePostRequest = (req, res) => {
        const emailOTP = req.body.emailOTP
        const phoneNumberOTP = req.body.phoneNumberOTP
        req.session.SingupBusinessEmailOPTAndPhoneOPTStep = true
        req.session.SingupBusinessEmailOPTAndPhoneOPT = {
            PhoneNumberOTP: phoneNumberOTP,
            EmailAddressOTP: emailOTP
        };


        res.redirect('/signup/password')
    }
    static SignupPasswordPage = (req, res) => {
        let TheSignupPAndPCValuesAndError = {
            passwordError: [''],
            passwordValue: '',
            confirmPasswordError: [''],
            confirmPasswordValue: '',
        }
        res.render('signup_password.ejs', { TheSignupPAndPCValuesAndError })
    }
    static SignupPasswordPagePostRequest = (req, res) => {

        
        const Password = req.body.Signup_password
        const hashPassword = bcrypt.hashSync(Password, 10)
        req.session.SingupBusinessPasswordStep = true
        req.session.SingupBusinessPassword = {
            Password: hashPassword,
        };
        res.redirect('/signup/username')
    }
    static SingupUsernamePage = (req, res) => {
        let TheSignupUsernameValuesAndError = {
            UsernameError: [''],
            UsernameValue: '',
        }
        res.render('signup_username.ejs', {TheSignupUsernameValuesAndError})
    }
    static SingupCreateAccountOrShowError = async (req, res) => {
        const SignupBusinessUsername = req.body.SignupUsername
        req.session.SingupBusinessUsername = {
            Username: SignupBusinessUsername
        };
        const Name = `${req.session.SingupBusinssNameAndCategory['Name']}`
        const Category = `${req.session.SingupBusinssNameAndCategory['Category']}`
        const Industry = `${req.session.SingupBusinessIndustryAndDescription['Industry']}`
        const Description = `${req.session.SingupBusinessIndustryAndDescription['Description']}`
        const Address = `${req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime['Address']}`
        const Profile = `${req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime['Profile']}`
        const Open_time = `${req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime['OpenTime']}`
        const Close_Time = `${req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime['CloseTime']}`
        let Holiday = `${req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTime['Holidays']}`
        // businesse owner inf
        const Owner_FirstName = `${req.session.SingupBusinessOwnerFirstNameAndLastName['FirstName']}`
        const Owner_LastName = `${req.session.SingupBusinessOwnerFirstNameAndLastName['LastName']}`
        // // Businesses contac
        const Phone_Number = `${req.session.SingupBusinessPhoneNumberAndEmailAddress['PhoneNumber']}`
        const Email_Address = `${req.session.SingupBusinessPhoneNumberAndEmailAddress['EmailAddress']}`
        // // password
        const Password = `${req.session.SingupBusinessPassword['Password']}`
        const Username = `${req.session.SingupBusinessUsername['Username']}`
        if (Holiday.includes(',')) {
            Holiday = Holiday.split(',') 
        }else Holiday = [Holiday]

        const pathOfTempFile = path.join(__dirname, '../temp_uploads', `${Profile}` );
        const nameOfFile = path.basename(pathOfTempFile)
        const destinationFolder = path.join(__dirname, '../UsersFiles/BusinessProfiles');
        const destinationPath = path.join(destinationFolder, nameOfFile);
        
        fs.renameSync(pathOfTempFile, destinationPath, (err)=>{
            if (err) {
                return console.error('Error moving file:', err);
            }
            console.log('File moved successfully!');
       })
    
        const ProfilePath = destinationPath.split('/').pop()
        
        const result = await Controller_Of_BusinessesMongoose.BusinessesModel.create({
            Name: Name,
            Category: Category,
            Industry: Industry,
            Description: Description,
            Address: Address,
            Profile: Profile,
            Open_time: Open_time,
            Close_Time: Close_Time,
            Holiday: Holiday,
            // businesse owner info
            Owner_FirstName: Owner_FirstName,
            Owner_LastName: Owner_LastName,
            // Businesses contact
            Phone_Number: Phone_Number,
            Email_Address: Email_Address,
            // password
            Password: Password,
            Username: Username
        })

        const token = jwt.sign({
            userId: result._id,
            username: result.Username,
            role: result.Role
        }, jwtSecret)
        // Set token as cookie:
        res.cookie('authToken', token, {
            httpOnly: true,      // Cannot access via JavaScript in browser (security)
            // secure: false,        // Set true if using HTTPS
            sameSite: 'lax',      // Protection against CSRF
            // maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (optional)
        });
        const decode = jwt.verify(token, jwtSecret)
        console.log('decode: ', decode)
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                // session deleted, you can redirect or send a response
                res.redirect('/'); // or wherever you want
            }
        });
    }
}


module.exports = {
    Controller_Of_SignUpController,
}

