import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <RouterLink to="/" className="navbar-brand">EFT-BALLISTICS</RouterLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item">
                    <RouterLink to="/me" className="nav-link btn custom-btn-nav">View My Profile</RouterLink>
                  </li>
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link btn custom-btn-nav">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <RouterLink to="/login" className="nav-link btn custom-btn-nav">Login</RouterLink>
                  </li>
                  <li className="nav-item">
                    <RouterLink to="/signup" className="nav-link btn custom-btn-nav">Signup</RouterLink>
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