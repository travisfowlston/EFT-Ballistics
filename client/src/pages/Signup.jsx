import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      {data ? (
        <div>
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        </div>
      ) : (
        <div>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <p className="text-secondary">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-floating">
              <input
                type="text"
                name="name"
                className="form-control"
                id="floatingInput"
                placeholder="Your username"
                value={formState.name}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Enter a username</label>
            </div>
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
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button className="btn btn-dark w-100 py-2" type="submit">
              Sign up
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Signup;
