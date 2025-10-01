import { useState } from "react";
import Banks from "./banks/Banks";
import Accounts from "./accounts/Accounts";
import Categories from "./categories/Categories";

function Admin() {
  const [active, setActive] = useState("banks");

  return (
    <>
      <h2 className="admin__title">Admin</h2>
      <div className="admin__tabs">
        <button
          className={`admin__tab ${
            active === "banks" ? "admin__tab--active" : ""
          }`}
          onClick={() => setActive("banks")}
        >
          Banks
        </button>
        <button
          className={`admin__tab ${
            active === "accounts" ? "admin__tab--active" : ""
          }`}
          onClick={() => setActive("accounts")}
        >
          Accounts
        </button>
        <button
          className={`admin__tab ${
            active === "categories" ? "admin__tab--active" : ""
          }`}
          onClick={() => setActive("categories")}
        >
          Categories
        </button>
      </div>

      {active === "banks" && <Banks />}
      {active === "accounts" && <Accounts />}
      {active === "categories" && <Categories />}
    </>
  );
}

export default Admin;
