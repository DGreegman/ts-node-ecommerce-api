import { configDotenv } from 'dotenv';


// Load environmental variables only when on development environment
if (process.env.NODE_ENV !== 'production')
    configDotenv();

/**
 * Global app configuration options
 */
const AppConfig: any = {
    db: {
        // url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSKEY}@ewriter.y9z37mo.mongodb.net/eCommerce`,
        url: 'mongodb://localhost:27017/eCommerce',
        user: process.env.MONGO_USER,
        key: process.env.MONGO_PASSKEY
    },
    server:{
        port: process.env.PORT || 5100,
        url: process.env.BASE_API_URL
    },
    JWT_KEY: process.env.JWT_SECRET
}

export default AppConfig;