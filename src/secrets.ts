import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const timezone = process.env.TZ;
export const PORT = process.env.PORT;
export const environment = process.env.NODE_ENV;
export const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
export const logDirectory = process.env.LOG_DIR;
export const JWT_SECRET_KEY:string = process.env.JWT_SECRET_KEY ||  'secret';
