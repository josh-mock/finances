import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bankRoutes from "./routes/banks.js";
import accountRoutes from "./routes/accounts.js";
import categoryRoutes from "./routes/categories.js";
dotenv.config();

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/banks", bankRoutes);
app.use("/accounts", accountRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
