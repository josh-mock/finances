import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import accountRoutes from "./routes/accounts.js";
import bankRoutes from "./routes/banks.js";
import categoryRoutes from "./routes/categories.js";
import dashboardRoutes from "./routes/dashboard.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budget.js";
dotenv.config();

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

// ADMIN ROUTES
app.use("/banks", bankRoutes);
app.use("/accounts", accountRoutes);
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/budget", budgetRoutes);

// DASHBOARD ROUTES
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
