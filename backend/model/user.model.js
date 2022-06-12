const mongoose  = require('mongoose')

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username : String,
        email : String,
        password : String,
        balance : Number,
        tether : Number,
        bitcoin : Number,
        shiba : Number,
        ethereum : Number,
        solana : Number,
        xrp : Number,
        dogecoin : Number,
        sandbox : Number,
        tron : Number,
        cardano : Number
    })
)

module.exports=User;