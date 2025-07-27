console.log('Signup password validation');
const Signup_password = document.getElementById('Signup-password')
const Signup_confirm_password = document.getElementById('Signup-confirm-password')
const Signup_password_error = document.getElementById('Signup-password-error')
const Signup_confirm_password_error = document.getElementById('Signup-confirm-password-error')

const hasLowerCase = /[a-z]/
const hasUpperCase = /[A-Z]/
const hasNumber = /[0-9]/
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

let isOnceClicked = false

document.getElementById('Signup-password-form').addEventListener('submit', (e) => {
    const Signup_password = document.getElementById('Signup-password').value.trim()
    const Signup_confirm_password = document.getElementById('Signup-confirm-password').value.trim()
    const Signup_password_error = document.getElementById('Signup-password-error')
    const Signup_confirm_password_error = document.getElementById('Signup-confirm-password-error')
    isOnceClicked = true

    let isValid = true

    if (!Signup_password) {
        Signup_password_error.textContent = 'Password is required'
        isValid = false
    } else if (Signup_password.length < 6) {
        Signup_password_error.textContent = 'Password must more then 6 characters'
        isValid = false
    } else if (!hasLowerCase.test(Signup_password)) {
        Signup_password_error.textContent = 'Password must contain at least one lowercase letter'
        isValid = false
    } else if (!hasUpperCase.test(Signup_password)) {
        Signup_password_error.textContent = 'Password must contain at least one uppercase letter'
        isValid = false
    } else if (!hasNumber.test(Signup_password)) {
        Signup_password_error.textContent = 'Password must contain at least one number'
        isValid = false
    } else if (!hasSpecialChar.test(Signup_password)) {
        Signup_password_error.textContent = 'Password must contain at least one special character'
        isValid = false
    } else {
        Signup_password_error.textContent = ''
    }


    if (!Signup_confirm_password) {
        Signup_confirm_password_error.textContent = 'Confirm password is required'
        isValid = false

    } else if (Signup_password !== Signup_confirm_password) {
        Signup_confirm_password_error.textContent = 'Password does not match'
        isValid = false
    }else {
        Signup_confirm_password_error.textContent = ''
    }



    if (!isValid) {
        e.preventDefault()
    }


})



Signup_password.addEventListener('input', (e) => {
    if (isOnceClicked) {

        if (!Signup_password) {
            Signup_password_error.textContent = 'Password is required'

        } else if (Signup_password.value.trim().length <= 6) {
            Signup_password_error.textContent = 'Password must be at least 6 characters long'

        }else if (!hasLowerCase.test(Signup_password.value.trim())) {

            Signup_password_error.textContent = 'Password must contain at least one lowercase letter'
        } else if (!hasUpperCase.test(Signup_password.value.trim())) {

            Signup_password_error.textContent = 'Password must contain at least one uppercase letter'
        } else if (!hasNumber.test(Signup_password.value.trim())) {

            Signup_password_error.textContent = 'Password must contain at least one number'
        } else if (!hasSpecialChar.test(Signup_password.value.trim())) {

            Signup_password_error.textContent = 'Password must contain at least one special character'
        } else {
            Signup_password_error.textContent = ''
        }

    }

})

Signup_confirm_password.addEventListener('input', (e)=>{
    if (isOnceClicked) {
        if (!Signup_confirm_password.value.trim()) {
            Signup_confirm_password_error.textContent = 'Confirm password is required'
        }else if (Signup_confirm_password.value.trim() !== Signup_password.value.trim()) {
            Signup_confirm_password_error.textContent = 'Password does not match'
        }else {
            Signup_confirm_password_error.textContent = ''
        }
    }
})
