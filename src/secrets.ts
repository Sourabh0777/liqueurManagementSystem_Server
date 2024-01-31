import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const PORT = process.env.PORT;
export const environment = process.env.NODE_ENV;
