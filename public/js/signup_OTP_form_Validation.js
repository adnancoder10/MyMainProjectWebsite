console.log('Signup OTP validation');
const Signup_verification_codePattern = /^\d{6}$/
const Signup_emailAdrress_verification_code = document.getElementById('Signup-emailAddress-verification-code')
const Signup_phoneNumber_verification_code = document.getElementById('Signup-phoneNumber-verification-code')


document.getElementById('Signup-emailAddress-phoneNumber-verification').addEventListener('submit', (e)=>{
    const Signup_emailAdrress_verification_code = document.getElementById('Signup-emailAddress-verification-code').value.trim()
    const Signup_phoneNumber_verification_code = document.getElementById('Signup-phoneNumber-verification-code').value.trim()
    const Signup_emailAddress_verification_code_error = document.getElementById('Signup_emailAddress_verification_code_error')
    const Signup_phoneNumber_verification_code_error = document.getElementById('Signup_phoneNumber_verification_code_error')

    let isValid = true

    if (!Signup_emailAdrress_verification_code) {
        Signup_emailAddress_verification_code_error.textContent = 'Email address OTP is required'
        isValid = false
    }else if (!Signup_verification_codePattern.test(Signup_emailAdrress_verification_code)) {
        Signup_emailAddress_verification_code_error.textContent = 'Enter valid OTP (6 digits)'
        isValid = false
    }else {
        Signup_emailAddress_verification_code_error.textContent = ''
    }

    if (!Signup_phoneNumber_verification_code) {
        Signup_phoneNumber_verification_code_error.textContent = 'Phone number OTP is required'
        isValid = false
    }else if (!Signup_verification_codePattern.test(Signup_phoneNumber_verification_code)) {
        Signup_phoneNumber_verification_code_error.textContent = 'Enter valid OTP (6 digits)'
        isValid = false
    }else {
        Signup_phoneNumber_verification_code_error.textContent = ''
    }


    if (!isValid) {
        e.preventDefault()
    }

})


Signup_phoneNumber_verification_code.addEventListener('input', (e)=>{
    if (Signup_verification_codePattern.test(Signup_phoneNumber_verification_code.value.trim())){
        document.getElementById('Signup_phoneNumber_verification_code_error').textContent = ''
    }
})

Signup_emailAdrress_verification_code.addEventListener('input', (e)=>{
    if (Signup_verification_codePattern.test(Signup_emailAdrress_verification_code.value.trim())){
        document.getElementById('Signup_emailAddress_verification_code_error').textContent = ''
    }
})
