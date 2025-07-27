const business_category_from = document.getElementById('business-category-from')
const dropdown_menu_of_business_category = document.getElementById('dropdown-menu-of-business-category')
const business_category_error = document.getElementById('business_category_error')



business_category_from.addEventListener('focusin', (e) => {
    dropdown_menu_of_business_category.style.display = 'block'
    // dropdown_menu_of_business_category.style.position = 'absolute'
    // business_category_error.textContent = ''
    business_category_error.style.display = 'none'
})

business_category_from.addEventListener('focusout', (e) => {
    setTimeout(() => {
        dropdown_menu_of_business_category.style.display = 'none'
        business_category_error.style.display = 'block'
        
    }, 300);
})
business_category_from.addEventListener('input', (e) => {
    dropdown_menu_of_business_category.style.display = 'none'

})

dropdown_menu_of_business_category.addEventListener('click', (e) => {
    business_category_from.value = e.target.innerText;
    business_category_error.textContent = ''

});




document.getElementById('Sign_up_page_form').addEventListener('submit', (e) => {
    const business_name_error = document.getElementById('business_name_error')
    const business_name = document.getElementById('business_name').value.trim()

    const business_category_error = document.getElementById('business_category_error')
    const business_category = document.getElementById('business-category-from').value.trim()
    const allowedCharsRegex = /^[\p{L}0-9\s&'.\-–—,:\/_()’‘“”`]+$/u
    const onlyNumbersRegex = /^[\d\s]+$/

    // console.log(business_category);
    // business_category_error.textContent = 'Hello wrold'

    let isValid = true

    if (!business_name) {
        business_name_error.textContent = 'Business name is required'
        isValid = false
    } else if (business_name.length == 1) {
        business_name_error.textContent = 'Busness name must be more then 1 letter'
        isValid = false
    }else if (!allowedCharsRegex.test(business_name)) {
        business_name_error.textContent = 'Business name contains invalid characters'
        isValid = false
    }else if(onlyNumbersRegex.test(business_name)){
        business_name_error.textContent = 'Business name cannot be just numbers'
        isValid = false
    }else {
        business_name_error.textContent = ''
    }

    if (!business_category) {
        business_category_error.textContent = 'Business category is required'
        isValid = false
    }else if (business_category.length == 1) {
        business_category_error.textContent = 'Busness category must be more then 1 letter'
        isValid = false
    }else if (!allowedCharsRegex.test(business_category)) {
        business_category_error.textContent = 'Business category contains invalid characters'
        isValid = false
    }else if(onlyNumbersRegex.test(business_category)){
        business_category_error.textContent = 'Business category cannot be just numbers'
        isValid = false
    }else{
        business_category_error.textContent = ''
    }


    if (!isValid) {
        e.preventDefault()
    }


})

const business_name = document.getElementById('business_name')
const business_name_error = document.getElementById('business_name_error')

business_name.addEventListener('input', (e)=>{
    if (business_name.value.trim().length >= 2) {
        business_name_error.textContent = ''
    }
})


business_category_from.addEventListener('input', (e)=>{
    if (business_category_from.value.trim().length >= 2) {
        document.getElementById('business_category_error').textContent = ''
    }

})