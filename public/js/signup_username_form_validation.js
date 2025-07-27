console.log('Signup username validation');

document.getElementById('signup-username-from').addEventListener('submit', (e)=>{
    const signup_username_input = document.getElementById('signup-username-input').value.trim()
    const signup_username_input_error = document.getElementById('signup-username-input-error')

    let isValid = true

    if (!signup_username_input) {
        signup_username_input_error.textContent = 'Username is required'
        isValid = false

    }else if (signup_username_input.length < 3 || signup_username_input.length > 15){ 
        signup_username_input_error.textContent =  'Username must be 3-15 characters long'
        isValid = false

    } else if (signup_username_input.includes(" ")) {
        signup_username_input_error.textContent = 'Spaces are not allowed in the username'
        isValid = false

    }else if(!/^[a-zA-Z0-9_]+$/.test(signup_username_input)) {
        signup_username_input_error.textContent = 'Only letters, numbers, and underscores are allowed'
        isValid = false

    }
    if (!isValid) {
        e.preventDefault()
    }

})
