import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    PORT: number,
    DBURL: string,
    NODE_ENV: string,
}

const config: IConfig = {
    PORT: 5000,
    DBURL: process.env.DBURL,
    NODE_ENV: process.env.NODE_ENV,
}

export default config
