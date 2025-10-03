import Admin from "./pages/admin/admin";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/layout";
import Transactions from "./pages/transactions/Transactions";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
}
