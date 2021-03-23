import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import SideDiv from "./SideDiv";
import url from "../utils/url_config";

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      errorMessages: [],
      successMessages: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.firstname.length == 0 ||
      this.state.lastname.length == 0 ||
      this.state.username.length == 0 ||
      this.state.email.length == 0 ||
      this.state.password.length == 0 ||
      this.state.confirmpassword.length == 0
    ) {
      toast.error("Please fill all fields before sign up");
    } else if (this.state.password != this.state.confirmpassword) {
      toast.error("password and confirm password are not matched");
    } else {
      Axios.post("/api/users/register", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
        pswd: this.state.password,
      })
        .then((res) => {
          this.setState({ errorMessages: [] });
          toast.success("User Successfully Created. Redirecting...");
          this.setState({
            successMessages: ["User Successfully Created. Redirecting..."],
          });
          setTimeout(() => {
            // go to login page
            this.props.history.push(url.userLogin);
          }, 2000);
        })
        .catch((err) => {
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
            });
            this.setState({ errorMessages: msgs });
          }
          throw err;
        });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="lg:flex">
          <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
              <div className="cursor-pointer flex items-center">
                <div>
                  <svg
                    className="w-10 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 225 225"
                    style={{ enableBackground: "new 0 0 225 225" }}
                    xmlSpace="preserve"
                  >
                    <style
                      type="text/css"
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                      }}
                    />
                    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                      <g>
                        <path
                          id="Layer0_0_1_STROKES"
                          className="st0"
                          d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
                  Skill Tuner
                </div>
              </div>
            </div>
            <div className="px-12 sm:px-24 xl:px-24">
              <h2
                className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
              >
                Signup
              </h2>
              <div>
                <div className="mt-10">
                  <div className="">
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-1">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="firstname"
                        >
                          First Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          name="firstname"
                          type="text"
                          placeholder="Your first name"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                      <div className="w-1/2 ml-1">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="lastname"
                        >
                          Last Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          name="lastname"
                          type="text"
                          placeholder="Your last name"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="username"
                        type="text"
                        placeholder="Your username"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Your secure password"
                      />
                      {/* <p className="text-grey text-xs mt-1">
                      At least 6 characters
                    </p> */}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm your secure password"
                        required
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                  <button
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                  >
                    Sign Up
                  </button>
                  <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </div>

                <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
                  Already have an account ?{" "}
                  <Link
                    to={url.userLogin}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    Sign in
                  </Link>
                </div>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>

          <SideDiv />
        </div>
      </>
    );
  }
}

export default UserSignup;
