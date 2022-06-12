const userController = require('../controller/user.controller')
const exchange = require('../middleware/exchange')


module.exports = function(app){

    app.post('/user/balance',userController.getUserBalance)

    app.post('/user/buy',[userController.verifyBalance],userController.buy)

    app.post('/user/sell',[userController.verifyCoins],userController.sell)

    app.post('/user/value',userController.getUserValue)

    app.get("/exchange/price/:coin",(req,res)=>{
        exchange.getCurrentPriceString(req,res)
    });

    
}


