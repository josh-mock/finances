import dayjs from "dayjs";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__header-inner">
          <h1 className="layout__title">Finances</h1>
          <nav className="layout__nav">
            <ul className="layout__nav-list">
              <li className="layout__nav-item">
                <Link className="layout__nav-link" to="/">
                  Dashboard
                </Link>
              </li>

              <li className="layout__nav-item">
                <Link className="layout__nav-link" to="/admin">
                  Admin
                </Link>
              </li>

              <li className="layout__nav-item">
                <Link className="layout__nav-link" to="/transactions">
                  Transactions
                </Link>
              </li>

              <li className="layout__nav-item">
                <Link className="layout__nav-link" to="/budget">
                  Budget
                </Link>
              </li>

              <li className="layout__nav-item">
                <Link className="layout__nav-link" to="/fbar">
                  FBAR
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">
        <span>
          &#169; {dayjs().format("YYYY")}{" "}
          <a href="https://josh-mock.com">Josh Mock</a>.
        </span>
      </footer>
    </div>
  );
}
