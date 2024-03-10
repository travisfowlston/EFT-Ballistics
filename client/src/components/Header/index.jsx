import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="container mb-4 p-3 d-flex align-items-center justify-content-between border-bottom border-color-#DBC59C position-fixed top-0 left-0 w-100">
      <div>
        <RouterLink to="/">
          <img
            src="./src/assets/logo.png"
            alt="EFT-BALLISTICS Logo"
            className="w-300px h-10 object-fit-cover border-1px border-color-#DBC59C"
          />
        </RouterLink>
      </div>

      <div>
        {Auth.loggedIn() ? (
          <>
            <a href="/me" className="btn btn-primary">
              View My Profile
            </a>
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="btn btn-primary mr-2">
              Login
            </a>
            <a href="/signup" className="btn btn-primary">
              Signup
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
