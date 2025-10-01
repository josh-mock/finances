import { useState } from "react";
import Banks from "./banks/Banks";
import Accounts from "./accounts/Accounts";
import Categories from "./categories/Categories";

function Admin() {
  const [active, setActive] = useState("banks");

  return (
    <>
      <div>
        <button onClick={() => setActive("banks")}>Banks</button>
        <button onClick={() => setActive("accounts")}>Accounts</button>
        <button onClick={() => setActive("categories")}>Categories</button>
      </div>

      {active === "banks" && <Banks />}
      {active === "accounts" && <Accounts />}
      {active === "categories" && <Categories />}
    </>
  );
}

export default Admin;
