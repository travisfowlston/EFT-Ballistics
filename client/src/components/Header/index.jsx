import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header-bg">
      <div className="container d-flex justify-content-between align-items-center h-100">
        <RouterLink to="/">
          <img
            src="./src/assets/logo.png"
            alt="EFT-BALLISTICS Logo"
            className="logo"
          />
        </RouterLink>

        <div>
          {Auth.loggedIn() ? (
            <>
              <a href="/me" className="btn custom-btn me-2">
                View My Profile
              </a>
              <button onClick={logout} className="btn custom-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="btn custom-btn me-2">
                Login
              </a>
              <a href="/signup" className="btn custom-btn">
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
