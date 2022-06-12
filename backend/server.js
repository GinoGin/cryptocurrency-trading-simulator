const express = require('express')
const cors = require('cors')
const dbConfig = require('./config/db')

const app = express();

const corsOption ={
    origin : "*"
};

app.use(cors(corsOption));
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))


const db = require('./model')

db.mongoose.connect(dbConfig.DB_URL+dbConfig.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to the database.....");
}).catch(err=>{
    console.log("error ",err);
    process.exit();
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

app.listen(8080,()=>{
    console.log("Server is running");
})
