const BusinessesSchemaAndModel = require("../model/Bussinesses_info")
const bcrypt = require('bcrypt')
const Controller_Of_BusinessesMongoose = require("../model/Bussinesses_info")


class Controller_Of_NonWebApp{
    static SignupPagesPostRequest = (req, res)=>{
        console.log('Now create the user account')
        const Name = req.body.SignupBusinessNameInput
        const Category = req.body.SignupBusinessCategoryInput
        const Industry = req.body.SignupBusinessIndustryInput
        const Description = req.body.SignupBusinessDescriptionInput
        const Address = req.body.SignupBusinessAddressInput
        const Profile = `${req.file.filename}`
        const Open_time = req.body.SignupBusinessOpenTimeInput
        const Close_Time = req.body.SignupBusinessCloseTimeInput
        const Holiday = req.body.SignupBusinessHolidaysInput
        const Owner_FirstName = req.body.SignupBusinessOwnerFirstNameInput
        const Owner_LastName = req.body.SignupBusinessOwnerLastNameInput
        const Phone_Number = req.body.SignupBusinessPhoneNumberInput
        const Email_Address = req.body.SignupBusinessEmailAddressInput
        // const PhoneNumberOTP = req.body.SignupBusinessPhoneNumberOTPInput
        // const EmailAddressOTP = req.body.SignupBusinessEmailAddressOTPInput
        const Password = req.body.SignupBusinessPassWordInput
        // const = req.body.SignupBusinessConfirmPasswordInput
        const Username = req.body.SignupBusinessUsernameInput
        const hashPassword = bcrypt.hashSync(Password, 10)
        Controller_Of_BusinessesMongoose.BusinessesModel.create({
            Name, Category, Industry, Description, Address, Profile, 
            Open_time, Close_Time, Holiday
            , Owner_FirstName, Owner_LastName, Phone_Number, Email_Address, 
            Password: hashPassword, Username})
    
        res.json({ message: 'Account successfull created!'})
        res.end()

    }
}


module.exports = Controller_Of_NonWebApp

