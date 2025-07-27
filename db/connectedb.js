const mongoose = require('mongoose')

const Connectedb = async(mongooseURL)=>{
    mongoose.connect(mongooseURL).then(()=>{
        console.log('mongodb connected');
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = {
    Connectedb
}
