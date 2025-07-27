console.log("business owner info script");
const Signup_business_owner_firstName = document.getElementById('Signup_business_owner_firstName')
const Signup_business_owner_lastName = document.getElementById('Signup_business_owner_lastName')



document.getElementById('business_ower_info_form').addEventListener('submit', (e)=>{
    const Signup_business_owner_firstName = document.getElementById('Signup_business_owner_firstName').value.trim()
    const Signup_business_owner_lastName = document.getElementById('Signup_business_owner_lastName').value.trim()
    const BOwonerNameCharReg = /^[\p{L}\s'.\-'"’‘“”]+$/u
    const BOwonerOnlyNumberCharReg = /^\d+$/
 

    let isValid = true

    if (!Signup_business_owner_firstName) {
        document.getElementById('Signup_business_owner_firstName_error').textContent = 'First name is required'
        isValid = false
    }else if (Signup_business_owner_firstName.length == 1) {
        document.getElementById('Signup_business_owner_firstName_error').textContent = 'First name must be more then 1 letter'
        isValid = false
    }else if(BOwonerOnlyNumberCharReg.test(Signup_business_owner_firstName)){
        document.getElementById('Signup_business_owner_firstName_error').textContent = 'First name cannot be just numbers'
        isValid = false
    }else if(!BOwonerNameCharReg.test(Signup_business_owner_firstName)){
        document.getElementById('Signup_business_owner_firstName_error').textContent = 'First name contains invalid characters'
        isValid = false
    }else {
        document.getElementById('Signup_business_owner_firstName_error').textContent = ''
    }

    if (!Signup_business_owner_lastName) {
        document.getElementById('Signup_business_owner_lastName_error').textContent = 'Last name is required'
        isValid = false
    }else if (Signup_business_owner_lastName.length == 1) {
        document.getElementById('Signup_business_owner_lastName_error').textContent = 'Last name must be more then 1 letter'  
        isValid = false
    }else if(BOwonerOnlyNumberCharReg.test(Signup_business_owner_lastName)){
        document.getElementById('Signup_business_owner_lastName_error').textContent = 'Last name cannot be just numbers' 
        isValid = false
    }else if(!BOwonerNameCharReg.test(Signup_business_owner_lastName)){
        document.getElementById('Signup_business_owner_lastName_error').textContent = 'Last name contains invalid characters'
        isValid = false
    }else{
        document.getElementById('Signup_business_owner_lastName_error').textContent = ''
    }
    if (!isValid) {
        e.preventDefault()
    }

})
Signup_business_owner_firstName.addEventListener('input', (e)=>{
    if (Signup_business_owner_firstName.value.trim().length >= 2){
        document.getElementById('Signup_business_owner_firstName_error').textContent = ''
    }
})

Signup_business_owner_lastName.addEventListener('input', (e)=>{
    if (Signup_business_owner_lastName.value.trim().length >= 2){
        document.getElementById('Signup_business_owner_lastName_error').textContent = ''
    }
})