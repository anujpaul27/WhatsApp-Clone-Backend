const app = require('./src/app')
const connectDB = require('./src/config/ConnectDB')


// connect database 
connectDB()


app.listen(5000, ()=>{
    console.log('Server running!...');
})