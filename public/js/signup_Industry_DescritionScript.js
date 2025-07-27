console.log('Hello industry description');
const business_industry = document.getElementById('business-industry')
const showing_option_for_businessIndustry = document.getElementById('showing-option-to-businessIndustry-input')
const shopIndustries = document.querySelector('.shopIndustries')
const business_description = document.getElementById('business-description')
const business_industry_error = document.getElementById('business_industry_error')
const business_description_error = document.getElementById('business_description_error')


function getCookie(business_industry) {
    let cookies = document.cookie
    let cookiesAsObject = {}

    if (cookies.includes('; ')) {
        let ConvertCookiesToArray = cookies.split('; ')
        ConvertCookiesToArray.forEach(TheCookies => {
            if (TheCookies.includes('=')){
                let TheCookiesKeysAndValue = TheCookies.split('=')
                if (TheCookiesKeysAndValue[1].includes('%20')){
                    let MoreCleanValues = TheCookiesKeysAndValue[1].replace(/%20/g, ' ')
                    cookiesAsObject[`${TheCookiesKeysAndValue[0]}`] = MoreCleanValues

                }else{

                    cookiesAsObject[`${TheCookiesKeysAndValue[0]}`] = TheCookiesKeysAndValue[1]
                }
            }
            

        });
        
    } else{

        let ConvertCookieToAnArray = cookies.split('=')
        if (ConvertCookieToAnArray[1].includes('%20')){
            let MoreCleanValue = ConvertCookieToAnArray[1].replace(/%20/g, ' ')
            cookiesAsObject[`${ConvertCookieToAnArray[0]}`] = MoreCleanValue
        }else{
            cookiesAsObject[`${ConvertCookieToAnArray[0]}`] = ConvertCookieToAnArray[1]
        }
    }


    return cookiesAsObject[business_industry]


}

// business_industry is the key of business_industry cookes object
// console.log(getCookie('business_industry'));

const business_industryFromCookies = getCookie('business_industry')



business_description.addEventListener('input', (e)=>{

    if (business_description.value.trim().split(' ').length > 10) {
        business_description_error.textContent = ''
        
    }

})

business_industry.addEventListener('input', (e)=>{
    if (business_industry.value.trim().length >= 2) {
        business_industry_error.textContent = ''
    }
})


document.getElementById('business-industry-descrition-from').addEventListener('submit', (e)=>{
    
    const business_industry = document.getElementById('business-industry').value.trim()
    const business_description = document.getElementById('business-description').value.trim()
    const business_industry_error = document.getElementById('business_industry_error')
    const business_description_error = document.getElementById('business_description_error')

    const OnlynumberReg = /^[\d\s]+$/
    const BIndustryCherReg = /^[\p{L}0-9\s&'.\-–—,_:\/()’‘“”`]+$/u


    const BDescriptionCherReg = /^[\p{L}0-9\s.,'"’‘“”!?()&\-–—:;%$@_\/\\[\]{}+=*#°…|`~^<>]*$/u

    let isValid = true
    
    if (!business_industry) {
        business_industry_error.textContent = 'Business industry is required'
        isValid = false
    }else if(business_industry.length == 1){
        business_industry_error.textContent = 'Business industry name must be more then 1 letter'
        isValid = false
    } else if (OnlynumberReg.test(business_industry)) {
        business_industry_error.textContent = 'Business industry cannot be just numbers'
        isValid = false
    } else if (!BIndustryCherReg.test(business_industry)) {
        business_industry_error.textContent = 'Business industry contains invalid characters'
        isValid = false
    }else{
        business_industry_error.textContent = ''
    }

    if (!business_description) {
        business_description_error.textContent = 'Business description is required'
        isValid = false
    }else if(business_description.split(' ').length < 10) {
        business_description_error.textContent = 'Business description must be more then 10 words'
        isValid = false
    }else if(OnlynumberReg.test(business_description)){
        business_description_error.textContent = 'Business description cannot be just number'
        isValid = false
    }else if(!BDescriptionCherReg.test(business_description)){
        business_description_error.textContent = 'Description contains invalid characters'
        isValid = false
    }else{
        business_description_error.textContent = ''
    }

    if (isValid == false) {
        e.preventDefault()
    }
})



const ShopsIndustriesList = ['Apparel store', 'Bakery', 'Bank', 'Barber_shop', 'Beauty_salon', 'Bookstore',
    'Cafe', 'Car_wash', 'Coffee_shop', 'Convenience_store', 'Department_store', 'Electronics_store', 'Florist',
    'Furniture_store', 'Gas_station', 'Gift_shop', 'Grocery_store', 'Gym', 'Hair_salon', 'Hardware_store',
    'Hotel', 'Ice_cream_parlor', 'Insurance_agency', 'Jewelry_store', 'Juice_bar', 'Kitchenware_store',
    'Laundry_service', 'Lingerie_store', 'Mattress_store', 'Medical_clinic', 'Mens_clothing_store',
    'Mobile_phone_store', 'Movie_theater', 'Nail_salon', 'Office_supply_store', 'Optical_store',
    'Outlet_store', 'Paint_store', 'Pet_store', 'Pharmacy', 'Photo_studio', 'Restaurant', 'Rug_store',
    'Shoe_store', 'Sporting_goods_store', 'Supermarket', 'Tanning_salon', 'Tea_house', 'Travel_agency',
    'Womens_clothin']


const Hospital_and_HealthcareIndustriesList = [
    'General Hospital (Public and Private)', 'Specialty Hospital', 'Teaching and Research Hospital',
    'Children’s Hospital', 'Psychiatric Hospital', 'Military Hospital', 'Government Hospital', 'General Practice Clinics',
    'Specialty Clinics ', 'Urgent Care Centers', 'Dental Clinics', 'Outpatient Surgery Centers', 'Diagnostic and Imaging Centers',
    'NurSign Homes', 'Assisted Living Facilities', 'Rehabilitation Centers', 'Palliative Care and Hospice Centers',
    'Surgical Instruments Manufacturers', 'Diagnostic Equipment Companies ', 'Prosthetics and Orthotics Providers',
    'Mobility Devices ', 'Pharmaceutical Companies', 'Biotechnology Firms ', 'Drug Distribution Companies',
    'Private Insurance Companies', 'Public Health Insurance Programs', 'Telemedicine Platforms', 'Health Data Analytics Companies',
    'Remote Monitoring Systems', 'Government Health Agencies', 
    // 'Physical Therapy and Occupational Therapy Clinics',
    'Nutrition and Dietetics Services', 'Speech and Language Therapy', 'Diagnostic Laboratories', 'Clinical Research Organizations',
    'Academic Research Institutions', 'Home NurSign Services', 'Elderly Care Services', 'Home-Based Therapy Services',
    'Chiropractic Clinics', 
    // 'Acupuncture and Traditional Medicine Centers', 
    'Wellness and Spa Services'

]


const CompanyIndustriesList = [
    'Banking', 'Investment Management', 'Insurance', 'FinTech', 'Accounting Services', 'Pharmaceuticals',
    'Biotechnology', 'Medical Devices', 'Health Insurance', 'Hospitals & Clinics', 'Telemedicine',
    'Automotive', 'Aerospace', 'Electronics', 'Chemicals', 'Heavy Machinery', 'Oil & Gas', 'Renewable Energy',
    'Utilities', 'Nuclear Energy', 'Film & Television Production', 'Music Industry', 'Gaming', 'Publishing',
    'AdvertiSign & Marketing', 'Airlines', 'Railways', 'Shipping & Maritime', 'Logistics & Supply Chain', 'Software Development',
    'Hardware Manufacturing', 'Information Technology Services', 'Cybersecurity', 'Artificial Intelligence', 'Cloud Computing',
    'E-learning', 'Educational Technology', 'K-12 Education Services', 'Higher Education Institutions',
    'Residential Real Estate', 'Commercial Real Estate', 'Property Management', 'Real Estate Investment Trusts', 'Farming', 'Agritech',
    'Livestock', 'Fisheries', 'E-commerce', 'Apparel & Accessories', 'Food & Beverage', 'Home Goods', 'Beauty & Cosmetics',
    'Hotels & Resorts', 'Travel Agencies', 'Event Management',
]


const EducationalInstitutionIndustriesList = [
    "Public Schools", "Private Schools", "Charter Schools", "Colleges", "Universities", "Community Colleges",
    "Technical Institutes", "MOOCs (Massive Open Online Courses)", "Virtual Classrooms", "Language Learning Platforms",
    "Learning Management Systems (LMS)", "Educational Software Development", "AI-driven Learning Tools", "Plumbing, Electrical, Carpentry",
    "Corporate Training Programs", "Certification Courses", "Culinary Schools", "Fashion Design Schools", "Test Prep Centers",
    "Subject-Specific Tutoring", "STEM Education Centers", "Arts & Music Programs", "Sports Coaching", "Scientific Research Facilities",
    "Policy Think Tanks", "Educational Research Organizations", "Schools for the Visually Impaired",
    "Hearing Impaired", "Autism and ADHD-focused Institutions", "Curriculum Development Firms",
    "College Admission Consulting", "Academic Book Publishers", "Educational Content Creation",
    "Standardized Testing Organizations", "Psychometric Testing Providers", "Public and Private Libraries",
    "Adult Literacy Programs", "Skill-building Workshops"

]


const Restaurant_and_Food_ServiceIndustriesList = [
    "Fine Dining Restaurants","Casual Dining Restaurants","Quick Service Restaurants (QSR)","Fast Casual Restaurants","Family Style Restaurants",
    "Buffets","Food Trucks","Ethnic","International Restaurants","Pop-Up Restaurants","Rooftop Restaurants",
    "Drive-In Restaurants","Dine-In Theaters","Farm-to-Table Restaurants","Beachfront Restaurants","Vegan",
    "Vegetarian Restaurants","Seafood Restaurants","Steakhouse Restaurants","Pizzerias","BBQ Joints",
    "Dessert-Only Restaurants","Catering Services","Institutional Food Service","Vending Services","Corporate Cafeterias","Meal Delivery Services",
    "Coffee Shops","Bars and Pubs","Specialty Food Providers","Airline Catering Services","Cruise Ship Food Services","Stadium",
    "Arena Food Services","Hotel Restaurants and Room Service","Street Food Vendors","Concession Stands","Food Halls","Commissary Kitchens",
    "Grocery Store Deli and Prepared Foods","Private Chefs and Personal Catering","School Cafeterias",
    "Senior Living Facility Food Services",

]



const Hotels_and_AccommodationIndustriesList = [
    "Luxury Hotels","Budget Hotels","Boutique Hotels","Resorts","Hostels","Motels","Bed & Breakfasts (B&B)",
    "Vacation Rentals ","Serviced Apartments","Guesthouses","Business Hotels","Spa & Wellness Hotels","Eco-Friendly Hotels",
    "All-Inclusive Resorts","Conference Hotels","Airport Hotels","Timeshare Resorts","Holiday Parks & Campgrounds",
    "Farm Stays","Cabins & Cottages","Cruise Ships & Floating Hotels","Extended Stay Hotels","Cultural/Heritage Hotels",
    "Mountain & Ski Resorts","Beach Resorts"

]


const TransportationIndustriesList = [
    "Trucking and Freight Hauling","Taxi and Ride-Hailing Services","Bus Services ",
    "Courier and Delivery Services","Moving and Relocation Services","Freight Rail Services",
    "Passenger Rail Services","High-Speed Rail Systems","Commercial Airlines","Cargo and Logistics Airlines",
    "Charter Flights and Private Jets","Aviation Maintenance and Repair","Shipping and Freight Lines","Ferry Services",
    "Cruise Line Services","Port and Harbor Operations","Metro/Subway Systems","Streetcars and Trams",
    "Commuter Bus Services","Intercity Bus and Coach Services","Freight Forwarding","WarehouSign and Distribution",
    "Last-Mile Delivery","Supply Chain Consulting","Medical Transport","Vehicle Transport Services","Hazardous Material Transportation",
    "Oversized and Heavy Equipment Transport","Electric Vehicle (EV) Charging and Rentals",
    // "Autonomous Vehicle Development and Services",
    "Drone Delivery Services","Hyperloop Development","Highway Construction and Maintenance","Airport Management",
    "Rail Infrastructure Maintenance","Maritime Infrastructure Development"
];



const EntertainmentIndustrisList = [
    "Motion picture production and distribution","TV broadcasting","Animation and visual effects",
    "Film and TV streaming services","Music production and distribution","Concerts and live performances",
    "Music streaming platforms","Record labels and artists' management","Game development and publishing",
    "Game streaming and esports","Mobile gaming",
    // "Virtual reality (VR) and augmented reality (AR) gaming",
    "Broadway and regional theater productions","Ballet and dance performances","Opera","Stand-up comedy",
    "Book publishing","Magazines and newspapers","Digital content platforms","Comics and graphic novels",
    "Professional sports leagues and teams","Sports broadcasting","Sports tourism and events management",
    "Amateur and recreational sports","Fashion design and retail","Celebrity endorsements and modeling","Fashion events",
    "Lifestyle media","Museums and galleries","Art auctions and exhibitions","Cultural heritage sites and tourism",
    "Music festivals and art fairs","Content creators","Influencers and brand partnerships","Online video platforms and live streaming",
    "Podcasts","Theme park design and operations","Amusement parks and water parks","Attractions, rides, and themed events",
    "Interactive experiences"

]


const NonProfit_OrganizationIndustriesList = [
    "Schools and Universities","Scholarships and Grants","Educational Resources and Support","Hospitals and Clinics",
    "Disease Prevention and Awareness","Mental Health Services","Research and Medical Innovations",
    "Homelessness and HouSign Assistance","Foster Care and Adoption","Child and Family Welfare","Youth Services",
    "Disability Services","Wildlife Protection","Environmental Advocacy","Climate Change Action","Conservation Programs",
    "Civil Rights Organizations","Refugee and Immigrant Support","Museums and Galleries","Performing Arts Groups",
    "Cultural Preservation","Community Art Programs","Emergency Response","Humanitarian Aid and Development","Poverty Alleviation",
    "Refugee Assistance","Religious Charities and Missions","Faith-Based Community Outreach","Interfaith Dialogue and Cooperation",
    "Animal Shelters and Rescue Groups","Wildlife Protection",
    // "Veterinary Care and Animal Rights Advocacy",
    "Economic Empowerment","Job Training and Placement","Affordable HouSign Projects",
    // "Volunteer and Community Engagement Programs",
    // "Think Tanks and Research Organizations",
    // "Government Transparency and Accountability",
    "Legal Aid and Advocacy",
    // "Foundations that provide funding for other NPOs",
    "Charity FundraiSign","Youth Sports Programs","Recreational Services",
    "Community Health and Fitness Initiatives", "Veteran Services and Advocacy","Support for Military Families",
    "Emergency Relief Organizations","Crisis Management and Recovery Services"
    
];




class Showing_and_hiding_industries_for_business {

    static Show_industries_for_shop = ()=> {
        ShopsIndustriesList.forEach(ListOfShopIndstry => {
            const divForShopIndustries = document.createElement('div');
            divForShopIndustries.innerHTML = `${ListOfShopIndstry}`
            divForShopIndustries.innerHTML = divForShopIndustries.innerHTML.replace('_', ' ')
            divForShopIndustries.className = 'shopIndustries'
            showing_option_for_businessIndustry.appendChild(divForShopIndustries)

        });

    }
    
    static Show_industries_for_Hospital_and_Healthcare = ()=>{
        Hospital_and_HealthcareIndustriesList.forEach(ListOFHospital_and_HealthcareIndustries=>{
            const divForHospital_and_HealthcareIndustries = document.createElement('div')
            divForHospital_and_HealthcareIndustries.innerHTML = `${ListOFHospital_and_HealthcareIndustries}`
            divForHospital_and_HealthcareIndustries.className = 'HospitalAndHealthcareIndustriesList'
            showing_option_for_businessIndustry.appendChild(divForHospital_and_HealthcareIndustries)

        })
    }

    static Show_industries_for_Company = ()=>{
        CompanyIndustriesList.forEach(ListOfCompany =>{
            const divForCompany = document.createElement('div')
            divForCompany.innerHTML = `${ListOfCompany}`
            divForCompany.className = 'CompanyList'
            showing_option_for_businessIndustry.appendChild(divForCompany)

        })
    }

    static Show_industries_for_EducationalInstitution = ()=>{
        EducationalInstitutionIndustriesList.forEach(ListOfEducationalInstitution =>{
            const divForEducationalInstitution = document.createElement('div')
            divForEducationalInstitution.innerHTML = `${ListOfEducationalInstitution}`
            divForEducationalInstitution.className = 'EducationalInstitutionList'
            showing_option_for_businessIndustry.appendChild(divForEducationalInstitution)

        })
    }

    static Show_industries_for_Restaurant_and_Food_Service = ()=>{
        Restaurant_and_Food_ServiceIndustriesList.forEach(ListOfRestaurant_and_Food_Service =>{
            const divForRestaurant_and_Food_Service = document.createElement('div')
            divForRestaurant_and_Food_Service.innerHTML = `${ListOfRestaurant_and_Food_Service}`
            divForRestaurant_and_Food_Service.className = 'RestaurantAndFoodServiceList'
            showing_option_for_businessIndustry.appendChild(divForRestaurant_and_Food_Service)
        })
    }

    static Show_industries_for_Hotels_and_Accommodation = ()=>{
        Hotels_and_AccommodationIndustriesList.forEach(ListOfHotels_and_Accommodation =>{
            const divForHotels_and_Accommodation = document.createElement('div')
            divForHotels_and_Accommodation.innerHTML = `${ListOfHotels_and_Accommodation}`
            divForHotels_and_Accommodation.className = 'HotelsAndAccommodationList'
            showing_option_for_businessIndustry.appendChild(divForHotels_and_Accommodation)
        })
        
    }

    static Show_industries_for_Transportation = ()=>{
        TransportationIndustriesList.forEach(ListOfTransportation =>{
            const divForTransportation = document.createElement('div')
            divForTransportation.innerHTML = `${ListOfTransportation}`
            divForTransportation.className = 'TransportationList'
            showing_option_for_businessIndustry.appendChild(divForTransportation)
        })
    }
    static Show_industries_for_Entertainment = ()=>{
        EntertainmentIndustrisList.forEach(ListOfEntertainment =>{
            const divForEntertainment = document.createElement('div')
            divForEntertainment.innerHTML = `${ListOfEntertainment}`
            divForEntertainment.className = 'EntertainmentList'
            showing_option_for_businessIndustry.appendChild(divForEntertainment)
        })
    }
    static Show_industries_for_NonProfit_Organization = ()=>{
        NonProfit_OrganizationIndustriesList.forEach(ListOFNonProfit_Organization =>{
            const divForNonProfit_OrganizationIndustries = document.createElement('div')
            divForNonProfit_OrganizationIndustries.innerHTML = `${ListOFNonProfit_Organization}`
            divForNonProfit_OrganizationIndustries.className = 'NonProfitOrganizationList'
            showing_option_for_businessIndustry.appendChild(divForNonProfit_OrganizationIndustries)
        })
    }

    static Hiding_industries_of_business = ()=> {
        setTimeout(() => {
            showing_option_for_businessIndustry.innerHTML = ''
            business_industry_error.style.display = 'block'

        }, 200);
    }


}

business_industry.addEventListener('focusin', (e) => {
    if (business_industryFromCookies == 'Shop') {
        Showing_and_hiding_industries_for_business.Show_industries_for_shop()

    }else if (business_industryFromCookies == 'Hospital and Healthcare') {
        Showing_and_hiding_industries_for_business.Show_industries_for_Hospital_and_Healthcare()
        
    }else if(business_industryFromCookies == 'Company') {
        Showing_and_hiding_industries_for_business.Show_industries_for_Company()

    }else if (business_industryFromCookies == 'Educational Institution') {
        Showing_and_hiding_industries_for_business.Show_industries_for_EducationalInstitution()
        
    }else if(business_industryFromCookies == 'Restaurant and Food Service'){
        Showing_and_hiding_industries_for_business.Show_industries_for_Restaurant_and_Food_Service()

    }else if(business_industryFromCookies == 'Hotels and Accommodation'){
        Showing_and_hiding_industries_for_business.Show_industries_for_Hotels_and_Accommodation()

    }else if(business_industryFromCookies == 'Transportation'){
        Showing_and_hiding_industries_for_business.Show_industries_for_Transportation()

    }else if(business_industryFromCookies == 'Entertainment'){
        Showing_and_hiding_industries_for_business.Show_industries_for_Entertainment()
    }else if(business_industryFromCookies == 'Non-Profit Organization'){
        Showing_and_hiding_industries_for_business.Show_industries_for_NonProfit_Organization()
    }
    business_industry_error.style.display = 'none'

})

business_industry.addEventListener('focusout', (e) => {

    Showing_and_hiding_industries_for_business.Hiding_industries_of_business()

})


business_industry.addEventListener('input', (e) => {
    showing_option_for_businessIndustry.innerHTML = ' '

})



showing_option_for_businessIndustry.addEventListener('click', (e) => {
    business_industry.value = e.target.innerText
    business_industry_error.textContent = ' '
})

