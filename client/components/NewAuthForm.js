import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { createCustomerThunk } from "../store/stripe";

class AuthForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    this.props.authenticate(username, password, formName);

    if (formName === "signup") {
      await this.props.createCustomerThunk(username);
      this.props.history.push("/signup/memberships");
    } else {
      console.log("this.props", this.props)
      window.location.assign("http://localhost:8080/api/spotify/login")
    }
  }

  render() {
    const { name, displayName, error } = this.props;
    return (
      <div className="container vh-100">
        <div className="row justify-content-center">
          <div className="col-6 mt-5">
            <div className="card bg-dark bg-opacity-50 bg-gradient">
              <div className="card-body">
                <form onSubmit={this.handleSubmit} name={name}>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <label htmlFor="username">
                        <small className="text-white">Username</small>
                      </label>
                      <input
                        className="form-control"
                        name="username"
                        type="text"
                      />
                    </div>
                    <div className="col-10 mb-4">
                      <label className="text-white" htmlFor="password">
                        <small>Password</small>
                      </label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                      />
                    </div>
                    <div className="col-10">
                      <button className="col-12 btn btn-success" type="submit">{displayName}</button>
                    </div>
                    {error && error.response && (
                      <div> {error.response.data} </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
    stripeCustomer: state.stripeCustomer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createCustomerThunk: (username) => dispatch(createCustomerThunk(username)),
    authenticate: (username, password, formName) =>
      dispatch(authenticate(username, password, formName)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
