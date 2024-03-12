import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({ email: "", password: "" });
  };

  return (
    <main className="Container mt-5 mx-5 center_content">
      <section className="d-flex justify-content-center">
        <div className="center_content border mt-5 p-5 signup">
          {data ? (
            <div className="form-signin">
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </div>
          ) : (
            <div className="form-signin">
              <h1 className="h3 mb-3 fw-normal text-white signup">
                Please log in
              </h1>
              <p className="accAlready">
                {" "}
                <bold>Don't have an account?</bold>{" "}
                <Link to="/signup">Sign up</Link>
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="form-floating">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-check text-start my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="remember-me"
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  className="btn btn-dark w-100 py-2 signUpBtn mt-5"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Login;
