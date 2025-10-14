import connectedDB from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
connectedDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
