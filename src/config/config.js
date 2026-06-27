require('dotenv').config()

if (!process.env.MONGODB_URI)
{
    throw new Error ('Database URI is not define')
}


const config = {
    MONGODB_URI : process.env.MONGODB_URI
}

module.exports = config