import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bankRoutes from "./routes/banks.js";
dotenv.config();

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/banks", bankRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
