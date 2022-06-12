const User = require('../model/user.model')
const exchange = require('../middleware/exchange')

exports.getUserBalance=(req,res)=>{

    User.findOne({
        username:req.body.username
    })
    .exec((err,user)=>{
        if(err){
            console.log("error occured");
            res.status(500).send({message: err})
            return;
        }
        res.status(200).send({
            username : user.username,
            balance : user.balance,
            tether : user.tether,
            bitcoin : user.bitcoin,
            shiba : user.shiba,
            ethereum : user.ethereum,
            solana : user.solana,
            xrp : user.xrp,
            dogecoin : user.dogecoin,
            sandbox : user.sandbox,
            tron : user.tron,
            cardano : user.cardano
        })

    })

}

exports.verifyCoins =(req,res,next)=>{

    User.findOne({
        username:req.body.username
    })
    .exec((err,user)=>{
        if(err){
            console.log("in verify");
            res.status(500).send({message:err})
            return;
        }

        let userCoins={
            'username' : user.username,
            'balance' : user.balance,
            'tether' : user.tether,
            'bitcoin' : user.bitcoin,
            'shiba' : user.shiba,
            'ethereum' : user.ethereum,
            'solana' : user.solana,
            'xrp' : user.xrp,
            'dogecoin' : user.dogecoin,
            'sandbox' : user.sandbox,
            'tron' : user.tron,
            'cardano' : user.cardano
        }
        exchange.getCurrentPrice(req.body.coin)
        .then((response)=>{
            const coinsSold = parseFloat(req.body.value)/parseFloat(response.data[0].price_usd);
            const coinBalance = userCoins[req.body.coin]
            if(coinsSold > coinBalance){
                res.status(404).send({message:"insufficient fund"})
                return;
            }
            if(req.body.value<=0){
                res.status(404).send({message:"negative value"});
                return;
            }
            else{
                req.coinsSold = coinsSold
                req.coinBalance = coinBalance
                next();
            }
        }).catch((error)=>{
            console.log(error);
        })


    })

}



exports.verifyBalance = (req,res,next)=>{

    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
        }
        if(req.body.value>user.balance){
            res.status(404).send({message:"insufficient balance"})
        }
        if(req.body.value<= 0){
            res.status(404).send({message : "Try again"})
        }
        next();
    })

}

exports.buy = (req,res)=>{
    const coin = req.body.coin;
    let coinBought = 0.0;
    exchange.getCurrentPrice(coin)
    .then((response)=>{
        coinBought = parseFloat(req.body.value) / parseFloat(response.data[0].price_usd)
        console.log(coinBought);

        let myquery = {balance: -req.body.value};
        myquery[req.body.coin] = coinBought;
        console.log(myquery);

        User.findOneAndUpdate({
            username:req.body.username
        },
        {
            $inc: myquery
        })
        .exec((err,user)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            if(!user){
                res.status(404).send({message:"User not found!"})
                return
            }
            res.status(200).send({
                balance:user.balance-req.body.value,
                coinBought:coinBought
            })
        })

    }).catch((error)=>{
        console.log(error);
    })
}

exports.sell = (req,res)=>{
    const coinsSold = req.coinsSold

    let myquery = {balance : req.body.value};
    myquery[req.body.coin] = -coinsSold;
    console.log(myquery);
    User.findOneAndUpdate({
        username:req.body.username
    },
    {
        $inc : myquery
    })
    .exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(!user){
            res.status(404).send({message:"user not found!"})
            return;
        }
        else{
            
            res.status(200).send({
                balance: user.balance,
                newCoinBalance:req.coinBalance-coinsSold,
                coinsSold : coinsSold
            })
        }
    })
}

exports.getUserValue = (req,res)=>{
    User.findOne({
        username:req.body.username
    })
    .exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        if(!user){
            res.status(404).send({message:"User not found!"})
        }

        let userCoins ={
            'tether' : user.tether,
            'bitcoin' : user.bitcoin,
            'shiba' : user.shiba,
            'ethereum' : user.ethereum,
            'solana' : user.solana,
            'xrp' : user.xrp,
            'dogecoin' : user.dogecoin,
            'sandbox' : user.sandbox,
            'tron' : user.tron,
            'cardano' : user.cardano
        }

        let userValue = user.balance;

        exchange.getCurrentPrice('tether')
            .then((response)=>{
                userValue = userValue + userCoins.tether * response.data[0].price_usd;
                return exchange.getCurrentPrice('bitcoin')
            })
            .then((response)=>{
                userValue = userValue + userCoins.bitcoin *response.data[0].price_usd;
                return exchange.getCurrentPrice('shiba')
            })
            .then((response)=>{
                userValue = userValue + userCoins.shiba * response.data[0].price_usd;
                return exchange.getCurrentPrice('ethereum')
            })
            .then((response)=>{
                userValue  = userValue + userCoins.ethereum * response.data[0].price_usd;
                return exchange.getCurrentPrice('solana')
            })
            .then((response)=>{
                userValue = userValue + userCoins.solana * response.data[0].price_usd
                return exchange.getCurrentPrice('xrp')
            })
            .then((response)=>{
                userValue = userValue + userCoins.xrp * response.data[0].price_usd
                return exchange.getCurrentPrice('dogecoin')
            })
            .then((response)=>{
                userValue = userValue + userCoins.dogecoin * response.data[0].price_usd
                return exchange.getCurrentPrice('sandbox')
            })
            .then((response)=>{
                userValue = userValue + userCoins.sandbox * response.data[0].price_usd
                return exchange.getCurrentPrice('tron')
            })
            .then((response)=>{
                userValue  = userValue + userCoins.tron * response.data[0].price_usd
                return exchange.getCurrentPrice('cardano')
            })
            .then((response)=>{
                userValue = userValue + userCoins.cardano * response.data[0].price_usd

                res.status(200).send({
                    username:user.username,
                    balance: user.balance,
                    userValue:userValue
                })
            })
            .catch((error)=>{
                console.log(error);
            })

    })
}