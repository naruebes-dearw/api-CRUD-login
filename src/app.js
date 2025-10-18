import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import registedRouter from "./routes/registedUserRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/register", registedRouter);

export default app;
