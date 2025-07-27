const Mongoose = require('mongoose')

class Controller_Of_BusinessesMongoose {
    // Businesses infomation
    static BusinessesSchema = new Mongoose.Schema({
        Name: {
            type: String,
            required: true
        },
        Category: {
            type: String,
            required: true
        },
        Industry: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        Address: {
            type: String,
            required: true
        },
        Profile: {
            type: String,
            required: true
        },
        Open_time: {
            type: String,
            required: true
        },
        Close_Time: {
            type: String,
            required: true
        },
        Holiday: {
            // type: String,
            type: Object,
            required: true
        },
        // businesse owner info
        Owner_FirstName: {
            type: String,
            required: true,
        },
        Owner_LastName: {
            type: String,
            required: true,
        },
        // Businesses contact
        Phone_Number: {
            type: String,
            required: true
        },
        Email_Address: {
            type: String,
            required: true
        },
        // password
        Password: {
            type: String,
            required: true
        },
        Username: {
            type: String,
            required: true,
        },
        Role: { 
            type: String, 
            enum: ['User', 'admin', 'superadmin'],
            default: 'User' 
        }

    })
    static BusinessesModel = new Mongoose.model('Businesses', this.BusinessesSchema)

    static getAllUsername = async ()=>{
        const Username = await this.BusinessesModel.find().select('Username -_id').lean()
        const onlyUsernames = Username.map(user => user.Username);
        return onlyUsernames
        
    }
}

module.exports = Controller_Of_BusinessesMongoose

