import { Link, Outlet } from "react-router-dom";
import dayjs from "dayjs";

export default function Layout() {
  return (
    <>
      <header>
        <div>
          <h1>Finances</h1>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <span>
          &#169; {dayjs().format("YYYY")}{" "}
          <a href="https://josh-mock.com">Josh Mock</a>.
        </span>
      </footer>
    </>
  );
}
