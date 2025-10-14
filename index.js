import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

console.log({ port, mongoUri, jwtSecret });
