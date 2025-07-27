console.log('Adress andd image, time, holiday from validation');
const business_address = document.getElementById('business_address')
const business_address_error = document.getElementById('business_address_error')
const businessHoliday = document.getElementById('businessHoliday')

document.getElementById('businessHoliday').addEventListener('change', (e)=>{
    const options = businessHoliday.options
    const noneoption = options[0]
    if (noneoption.selected) {
        Array.from(options).forEach((element)=>{
            element.selected = false
            noneoption.selected = true
        })
  
    }
    // Array.from(businessHoliday.selectedOptions).forEach((element)=>{
    //     console.log(element);
    // })
    
    
})

document.getElementById('businessOpenTimeInput').addEventListener('change', (e)=>{
    if (e.target.value) {
        document.getElementById('business_open_time_error').textContent = ''
    }
})

document.getElementById('businessCloseTimeInput').addEventListener('change', (e)=>{
    if (e.target.value) {
        document.getElementById('business_close_time_error').textContent = ''
    }
})

document.getElementById("business_profile").addEventListener("change", function(event) {
    const business_profiles_name = event.target.files[0].name
    if (business_profiles_name.endsWith('.png') || business_profiles_name.endsWith('.jpg') || business_profiles_name.endsWith('.jpeg')) {
        document.getElementById('business_profile_error').textContent = ''
    }else if (!business_profiles_name.endsWith('.png') || !business_profiles_name.endsWith('.jpg') || !business_profiles_name.endsWith('.jpeg')) {
        document.getElementById('business_profile_error').textContent = 'Please select image'
    }
});


business_address.addEventListener('input', (e) => {
    if (business_address.value.trim().length >= 2) {
        business_address_error.textContent = ''
    }
})

document.getElementById('address-image-time-holdayPageContainerForm').addEventListener('submit', (e) => {
    const business_address = document.getElementById('business_address').value.trim()
    const business_address_error = document.getElementById('business_address_error')
    const business_profile = document.getElementById('business_profile')
    const business_profile_error = document.getElementById('business_profile_error')
    const businessHoliday = document.getElementById('businessHoliday')
    const business_holiday_error = document.getElementById('business_holiday_error')

    const BTimeReg = /^((0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)|(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/i
    const OnlynumberReg = /^[\d\s]+$/
    const BAddressCher = /^[\p{L}0-9\s,.\-/#&():'"’‘“”]+$/u

    let isValid = true

    if (!business_address) {
        business_address_error.textContent = 'Business address is required'
        isValid = false
    } else if (business_address.length == 1) {
        business_address_error.textContent = 'Business address must be more then 1 letter'
        isValid = false
    } else if (OnlynumberReg.test(business_address)) {
        business_address_error.textContent = 'Business address cannot be just numbers'
        isValid = false
    } else if (!BAddressCher.test(business_address)) {
        business_address_error.textContent = 'Business address contains invalid characters'
        isValid = false
    }else {
        business_address_error.textContent = ''
    }
    // const business_profile_info = business_profile.files[0]
    if (!business_profile.value) {
        business_profile_error.textContent = 'Business profile is required'
        isValid = false
    } else if (business_profile.value.endsWith(".png") || business_profile.value.endsWith(".jpg") || business_profile.value.endsWith(".jpeg")) {
        business_profile_error.textContent = ''
    }else{
        isValid = false
        business_profile_error.textContent = 'Please select image'

    }
    const businessOpenTimeInput = document.getElementById('businessOpenTimeInput').value
    // console.log(businessOpenTimeInput);

    if (!businessOpenTimeInput) {
        document.getElementById('business_open_time_error').textContent = 'Open time is required'
        isValid = false
    }else if(!BTimeReg.test(businessOpenTimeInput)) {
        document.getElementById('business_open_time_error').textContent = 'Open time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format'
        isValid = false
    }else{
        document.getElementById('business_open_time_error').textContent = ''
    }
    const businessCloseTimeInput = document.getElementById('businessCloseTimeInput').value

    if (!businessCloseTimeInput) {
        document.getElementById('business_close_time_error').textContent = 'Close time is required'
        isValid = false
    }else if(!BTimeReg.test(businessCloseTimeInput)){
        document.getElementById('business_close_time_error').textContent = 'Close time must be in 12h (e.g. 09:00 AM) or 24h (e.g. 14:00) format'
        isValid = false 
    }else{
        document.getElementById('business_close_time_error').textContent = ''
    }
    console.log(businessHoliday.selectedOptions.length);

    if (businessHoliday.selectedOptions.length == 0) {
        business_holiday_error.textContent = 'Please select holiday or None'
        isValid = false
    }

    if (!isValid) {
        e.preventDefault()
    }

})
