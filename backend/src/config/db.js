const mongoose = require("mongoose")

const mongoDbUrl='mongodb+srv://kishore:KishSabi%402268@anivarti.cp7lj.mongodb.net/clothing-store'
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}