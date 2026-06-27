const mongoose = require('mongoose')
const config = require('./config')

const ConnectDB = async () =>
{
    try
    {
        await mongoose.connect(config.MONGODB_URI)
        console.log('Database Connected!.');
    }
    catch (err)
    {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
}

module.exports = ConnectDB