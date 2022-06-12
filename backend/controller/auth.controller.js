const User = require('../model/user.model')


exports.signup = (req,res)=>{

    const user = new User({

        username: req.body.username,
        email : req.body.email,
        password : req.body.password,
        balance : 10000,
        tether : 0,
        bitcoin : 0,
        shiba : 0,
        ethereum : 0,
        solana : 0,
        xrp : 0,
        dogecoin : 0,
        sandbox : 0,
        tron : 0,
        cardano : 0


    });
    user.save((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        res.status(200).send({
            id: user._id,
            username:user.username,
            email:user.email
        })
    })

}

exports.signin = (req,res)=>{

    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(!user){
            res.status(404).send({message:"User not found! "});
            return;
        }
        if(req.body.password!=user.password){
            res.status(401).send({message:"Invalid Password"});
            return;
        }
        res.status(200).send({
            id: user._id,
            username:user.username,
            email:user.email

        })
    })

}