import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import auth_axios from "../utils/auth_axios";
import Footer from "./Footer";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isChange: false,
    };
  }
  handleChangePassword = async (e) => {
    e.preventDefault();
    if (
      this.state.oldPassword.length == 0 ||
      this.state.newPassword.length == 0 ||
      this.state.oldPassword.length == 0
    ) {
      toast.error("please fill all fields");
    } else if (this.state.newPassword != this.state.confirmPassword) {
      toast.error("password and confirm password are not matched");
    } else {
      await auth_axios
        .put("/api/users/updatePassword/", {
          oldpassword: this.state.oldPassword,
          pswd: this.state.newPassword,
          _id: this.props.userId,
        })
        .then((data) => {
          if (data.status == 200) {
            setTimeout(() => {
              toast.success("password changed successfully");
              window.location.reload();
            }, 1000);
          }
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
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <section
          style={{
            height: 400,
            backgroundColor: "black",
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Settings
                </h3>
                <p className="text-lg text-shadow  ">Change your password!!</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gray-100">
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <main className="md:p-0 lg:pt-8 lg:px-8  ">
              <section className="bg-cream-lighter p-4 shadow">
                <div className="md:flex">
                  <h2 className="md:w-full uppercase text-center tracking-wide text-sm sm:text-lg mb-6">
                    Change your Password
                  </h2>
                </div>
                <form>
                  <div className="md:flex text-center mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="mb-4">
                        <label className="block uppercase  tracking-wide text-xs font-bold">
                          old password
                        </label>
                        <input
                          className="w-2/6 shadow-inner p-2 border-0"
                          type="password"
                          name="oldPassword"
                          onChange={(e) => this.handleChange(e)}
                          placeholder="Old Password"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block uppercase tracking-wide text-xs font-bold">
                          new password
                        </label>
                        <input
                          className="w-2/6 shadow-inner p-2 border-0"
                          type="password"
                          name="newPassword"
                          onChange={(e) => this.handleChange(e)}
                          placeholder="new Password"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block uppercase tracking-wide text-xs font-bold">
                          Confirm password
                        </label>
                        <input
                          className="w-2/6 shadow-inner p-2 border-0"
                          type="password"
                          name="confirmPassword"
                          onChange={(e) => this.handleChange(e)}
                          placeholder="Confirm Password"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => this.handleChangePassword(e)}
                        class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </main>
          </div>
          <br />
          <br />
          <br />
        </div>
        <Footer />
      </>
    );
  }
}

export default UserSettings;
