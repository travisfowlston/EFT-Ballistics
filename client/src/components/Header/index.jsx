import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <RouterLink to="/" className="navbar-brand">
            EFT BALLISTICS
          </RouterLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item">
                    <RouterLink to="/me" className="nav-link">
                      View My Profile
                    </RouterLink>
                  </li>
                  <li className="nav-item">
                    <RouterLink onClick={logout} className="nav-link">
                      Logout
                    </RouterLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <RouterLink to="/login" className="nav-link">
                      Login
                    </RouterLink>
                  </li>
                  <li className="nav-item">
                    <RouterLink to="/signup" className="nav-link">
                      Signup
                    </RouterLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
