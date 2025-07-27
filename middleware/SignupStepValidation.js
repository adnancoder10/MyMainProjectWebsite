
class StepValidation_Of_Singup {
    static SingupBusinessNameAndCategoryStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessNameAndCategoryStep){
          return res.redirect('/signup');
        }else next()
    }
    static SingupBusinessNameAndCategoryStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessNameAndCategoryStep){
            return res.status(403).json({ error: 'Please complete the Business Name and Category form before moving forward'});
        }else next()
    }
    static SingupBusinessIndustryAndDescriptionStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessIndustryAndDescriptionStep){
          return res.redirect('/signup/industry_dec');
        }else next()
    }
    static SingupBusinessIndustryAndDescriptionStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessIndustryAndDescriptionStep){
            return res.status(403).json({ error: 'Please complete the Business Industry and Description form before moving forward'});
        }else next()
    }
    static SingupBusinessAddressAndImageTimeHolidayStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTimeStep){
          return res.redirect('/signup/address_image_time_holiday');
        }else next()
    }
    static SingupBusinessAddressAndImageTimeHolidayStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessProfileAndAddressAndHolidayAndOpenTimeAndCloseTimeStep){
            return res.status(403).json({ error: 'Please complete the Business Profile, Address, Time, and Holiday form before moving forward'});
        }else next()
    }
    static SingupBusinessOwnerInfoStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessOwnerFirstNameAndLastNameStep){
          return res.redirect('/signup/business_owner_info');
        }else next()
    }
    static SingupBusinessOwnerInfoStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessOwnerFirstNameAndLastNameStep){
            return res.status(403).json({ error: 'Please complete the Business Woner First Name and Last Name form before moving forward'});
        }else next()
    }
    static SingupBusinessPhoneNumberEmailAdressStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessPhoneNumberAndEmailAddressStep){
          return res.redirect('/signup/phoneNumber_emailAdress');
        }else next()
    }
    static SingupBusinessPhoneNumberEmailAdressStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessPhoneNumberAndEmailAddressStep){
            return res.status(403).json({ error: 'Please complete the Business Phone Number and Email Address form before moving forward'});
        }else next()
    }
    static SingupBusinessOPT_VerificationStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessEmailOPTAndPhoneOPTStep){
          return res.redirect('/signup/OPT_verification');
        }else next()
    }
    static SingupBusinessOPT_VerificationStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessEmailOPTAndPhoneOPTStep){
            return res.status(403).json({ error: 'Please complete the Business OTP Verification form before moving forward'});
        }else next()
    }
    static SingupBusinessPasswordStepRequired = (req, res, next)=>{
        if (!req.session.SingupBusinessPassword){
          return res.redirect('/signup/password');
        }else next()
    }
    static SingupBusinessPasswordStepRequiredForPost = (req, res, next)=>{
        if (!req.session.SingupBusinessPassword){
            return res.status(403).json({ error: 'Please complete the Business Password form before moving forward'});

        }else next()
    }

}


module.exports = StepValidation_Of_Singup