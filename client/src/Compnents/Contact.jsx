import axios from "axios";
import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      email: "",
      phoneno: "",
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.name.length === 0 ||
      this.state.designation.length === 0 ||
      this.state.email.length === 0 ||
      this.state.phoneno.length === 0 ||
      this.state.message.length === 0
    ) {
      toast.error("please fill all fields to send the message");
    } else {
      await axios
        .post("/api/users/contactus", {
          name: this.state.name,
          designation: this.state.designation,
          email: this.state.email,
          phoneno: this.state.phoneno,
          message: this.state.message,
        })
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              toast.success(
                "your message has being sent to the admin he will Contact you shortly!!!"
              );
              window.location.reload();
            }, 1200);
          } else {
            toast.error("error in sending the message");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                  Contact Us
                </h3>
                <p className="text-lg text-shadow  ">
                  We would love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="contact-1 py-4 md:py-12 bg-gray-100">
          <br />
          <br />
          <br />
          <div className="container mx-auto px-4">
            <div className="xl:flex -mx-4">
              <div className="xl:w-10/12 xl:mx-auto px-4">
                <div className="xl:w-3/4 mb-4">
                  <p className="text-xl mb-2">
                    Please submit your information and we will get back to you.
                  </p>
                  <p>
                    Call us at{" "}
                    <a
                      href="tel:+92301632138"
                      className="text-indigo-600 border-b border-transparent hover:border-indigo-600 transition-colors duration-300"
                    >
                      +92 301 632138
                    </a>
                  </p>
                </div>
                <div className="md:flex md:-mx-4 mt-4 md:mt-10">
                  <div className="md:w-2/3 md:px-4">
                    <div className="contact-form">
                      <div className="sm:flex sm:flex-wrap -mx-3">
                        <div className="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            onChange={(e) => this.handleChange(e)}
                            className="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                          />
                        </div>
                        <div className="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Designation"
                            name="designation"
                            onChange={(e) => this.handleChange(e)}
                            className="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                          />
                        </div>
                        <div className="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="E-mail address"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                            className="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                          />
                        </div>
                        <div className="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Phone Number"
                            name="phoneno"
                            onChange={(e) => this.handleChange(e)}
                            className="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                          />
                        </div>
                        <div className="sm:w-full px-3">
                          <textarea
                            name="message"
                            id="message"
                            cols={30}
                            rows={4}
                            name="message"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Your message here"
                            className="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="text-right mt-4 md:mt-12">
                        <button
                          onClick={(e) => this.handleSubmit(e)}
                          className="border-2 border-indigo-600 rounded px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                        >
                          Send a Message
                          <i className="fas fa-chevron-right ml-2 text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 md:px-4 mt-10 md:mt-0">
                    <div className="bg-indigo-100 rounded py-4 px-6">
                      <h5 className="text-xl font-medium mb-3">Help</h5>
                      <p className="text-gray-700 mb-4">
                        Need help or have any query? Don't hesitate, you can
                        directly shoot us an{" "}
                        <a
                          href="mailto:"
                          className="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          email
                        </a>{" "}
                        or call us at{" "}
                        <a
                          href="tel:"
                          className="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          +92 301 632138
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Contact;
