const db = require('../model/index')
const User = db.user

checkDuplicateUserNameOrEmail =(req,res,next)=>{
    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(user){
            res.status(400).send({message:"Falied! username is already exist"})
            return;
        }

        User.findOne({
            email:req.body.email
        }).exec((err,user)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            if(user){
                res.status(400).send({message:"Failed email already exist"})
                return;
            }
            next();
        })

    })
}

const verifySignup = {
    checkDuplicateUserNameOrEmail
}

module.exports = verifySignup;