console.log('phone number and emali Address form vlidation');
const SignupBusinessOwnerPhoneNumberPattern = /^[0-9]{10,15}$/;
const SignupBusinessOwnerEmailPattern = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/

const SignupBusinessEmailAddress = document.getElementById('Signup-business-emailAddress')
const SignupBusinessPhoneNumber  = document.getElementById('Signup-business-phoneNumber')

SignupBusinessPhoneNumber.addEventListener('input', (e)=>{
    if (SignupBusinessOwnerPhoneNumberPattern.test(SignupBusinessPhoneNumber.value.trim())) {
        document.getElementById('Signup-business-phoneNumber_error').textContent = ''
    }
})

SignupBusinessEmailAddress.addEventListener('input', (e)=>{
    if (SignupBusinessOwnerEmailPattern.test(SignupBusinessEmailAddress.value.trim())) {
        document.getElementById('Signup-business-emailAddress_error').textContent = ''
    }
})



document.getElementById('Signup-business-phoneNumber-emailAddress-form').addEventListener('submit', (e)=>{
    const Signup_business_phoneNumber = document.getElementById('Signup-business-phoneNumber').value.trim()
    const Signup_business_emailAddress = document.getElementById('Signup-business-emailAddress').value.trim()
    const Signup_business_phoneNumber_error = document.getElementById('Signup-business-phoneNumber_error')
    const Signup_business_emailAddress_error = document.getElementById('Signup-business-emailAddress_error')


    let isValid = true

    if (Signup_business_phoneNumber.length == 0) {
        Signup_business_phoneNumber_error.textContent = 'Phone number is required'
        isValid = false
    }else if (!SignupBusinessOwnerPhoneNumberPattern.test(Signup_business_phoneNumber)) {
        Signup_business_phoneNumber_error.textContent = 'Enter a valid phone number (10-15 digits)'
        isValid = false
        
    }else {
        Signup_business_phoneNumber_error.textContent = ''
    }
    if (Signup_business_emailAddress.length == 0) {
        Signup_business_emailAddress_error.textContent = 'Email address is required'
        isValid = false
    }else if (!SignupBusinessOwnerEmailPattern.test(Signup_business_emailAddress)) {
        Signup_business_emailAddress_error.textContent = 'Enter a valid email address'
        isValid = false

    }else {
        Signup_business_emailAddress_error.textContent = ''
    }


    console.log(isValid);
    if (isValid == false) {
        e.preventDefault()
    }
})

