import { configDotenv } from 'dotenv';


// Load environmental variables only when on development environment
if (process.env.NODE_ENV !== 'production')
    configDotenv();

/**
 * Global app configuration options
 */
const Config: any = {
    DB: {
        // url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSKEY}@cluster0.nxiuya9.mongodb.net/GASSED`,
        url: 'mongodb://localhost:27017/GASSED',
        user: process.env.MONGO_USER,
        key: process.env.MONGO_PASSKEY
    },
    Server: {
        port: process.env.PORT || 5100,
        url: process.env.BASE_API_URL
    },
    SMS:{
        accountSID: process.env.TWILIO_ACCOUNT_SID,
        authToken:process.env.TWILIO_AUTH_TOKEN,
        sender: process.env.SENDER
    },
    Device: {
        key: process.env.HARDWARE_API_KEY
    },
    JWT_KEY: process.env.JWT_SECRET
}

export default Config;