import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Admin from "./pages/admin/admin";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import Transactions from "./pages/transactions/Transactions";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
        </Route>
      </Routes>
    </Router>
  );
}
