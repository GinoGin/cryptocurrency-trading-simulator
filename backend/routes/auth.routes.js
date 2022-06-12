const verifySignup = require('../middleware/verifySignup')
const controller = require('../controller/auth.controller')


module.exports =function(app){
    app.post("/auth/signup",[verifySignup.checkDuplicateUserNameOrEmail],controller.signup)

    app.post("/auth/signin",controller.signin)

    

}




