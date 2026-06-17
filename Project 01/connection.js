const mongoose = require("mongoose")

async function connectMongoDb(url){
    return mongoose.connect(url)
        .then(()=>"MongoDb connected successfully!")
        .catch((error)=>console.log(error))
}

module.exports = {
    connectMongoDb,
}