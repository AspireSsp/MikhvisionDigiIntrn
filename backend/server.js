const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/dataBaseconnection');





// configuring the port
dotenv.config({path:'./config/config.env'});
// database connection
connectDB()
console.log('ser')
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port  ${process.env.PORT}`);
});

