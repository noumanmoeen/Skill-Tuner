import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class PaymentTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: 1,
      cvv: "",
      cardNo: "",
      expiry: "",
      mobileNo: "",
      cnicDigits: "",
      year: "20",
      month: "01",
      name: "",
      loading: false,
    };
  }

  handlePayWithCard = async (userId, email, mobileNo, amount, description) => {
    if (
      this.state.cvv.length === 0 ||
      this.state.cardNo.length === 0 ||
      this.state.month.length === 0 ||
      this.state.year.length === 0 ||
      this.state.name.length === 0
    ) {
      toast.error("please fill data in all field to pay the payment");
    } else {
      if (this.state.cardNo.length === 16) {
        if (this.state.cvv.length === 3) {
          this.setState({ loading: true });
          toast.success("Please wait for completing your transaction");
          await auth_axios
            .post("/api/payment/pay", {
              method: "cardNo",
              userId: userId,
              email: email,
              mobileNo: mobileNo,
              amount: amount,
              description: description,
              cardNo: this.state.cardNo,
              expire: this.state.month + this.state.year,
              cvv: this.state.cvv,
            })
            .then(async (result) => {
              if (result.data.responseCode === "000") {
                toast.success(result.data.responseMessage);
                await auth_axios
                  .post("/api/users/courses/add/", {
                    _id: this.props.userId,
                    courseId: this.props.courseId,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                      setTimeout(() => {
                        toast.success(
                          "You are enroled in the Course Sucessfully"
                        );
                        this.setState({ loading: false });
                        window.location.reload();
                      }, 1200);
                    } else {
                      toast.error(
                        "there is a problem with server please try again later"
                      );
                      this.setState({ loading: false });
                    }
                  })
                  .catch((err) => {
                    this.setState({ loading: false });
                    if (
                      err.response &&
                      Array.isArray(err.response.data.messages)
                    ) {
                      const msgs = err.response.data.messages.map((v) =>
                        toast.error(v.msg)
                      );
                    }
                    throw err;
                  });
              } else {
                toast.error(result.data.responseMessage);
                this.setState({ loading: false });
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
        } else {
          toast.error("please enter a valid cvv.");
        }
      } else {
        toast.error("please enter a valid card no to proceed the payment.");
      }
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePayWithMobileNo = async (description, amount, courseId) => {
    if (
      this.state.mobileNo.length === 0 ||
      this.state.cnicDigits.length === 0
    ) {
      toast.error("please fill data in all field to pay the payment");
    } else {
      this.setState({ loading: true });
      toast.success("Please wait for completing your transaction");
      if (this.state.mobileNo.length === 11) {
        if (this.state.cnicDigits.length === 6) {
          await auth_axios
            .post("/api/payment/pay", {
              method: "mobileNo",
              mobile: this.state.mobileNo,
              cnic: this.state.cnicDigits,
              description: description,
              amount: amount,
              courseId: courseId,
            })
            .then(async (result) => {
              console.log(result.data);
              if (result.data.pp_ResponseCode === "000") {
                toast.success(result.data.pp_ResponseMessage);
                await auth_axios
                  .post("/api/users/courses/add/", {
                    _id: this.props.userId,
                    courseId: this.props.courseId,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                      setTimeout(() => {
                        toast.success(
                          "You are enroled in the Course Sucessfully"
                        );
                        this.setState({ loading: false });
                        window.location.reload();
                      }, 1200);
                    } else {
                      toast.error(
                        "there is a problem with server please try again later"
                      );
                      this.setState({ loading: false });
                    }
                  })
                  .catch((err) => {
                    this.setState({ loading: false });
                    if (
                      err.response &&
                      Array.isArray(err.response.data.messages)
                    ) {
                      const msgs = err.response.data.messages.map((v) =>
                        toast.error(v.msg)
                      );
                    }
                    throw err;
                  });
              } else {
                toast.error(result.data.pp_ResponseMessage);
                this.setState({ loading: false });
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
        } else {
          toast.error("Please enter only last 6 digits of cnic");
        }
      } else {
        toast.error("Please enter eleven no digits.");
      }
    }
  };

  render() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (this.state.openTab === 1
                      ? "text-white bg-" + this.props.color + "-600"
                      : "text-" + this.props.color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ openTab: 1 });
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Pay With Credit card
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (this.state.openTab === 2
                      ? "text-white bg-" + this.props.color + "-600"
                      : "text-" + this.props.color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ openTab: 2 });
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Pay with Mobile No
                </a>
              </li>
            </ul>
            <div className="text-sm relative flex min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4  flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={this.state.openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <div className="">
                      <div
                        className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="w-full pt-1 pb-5"></div>
                        <div className="mb-10">
                          <h1 className="text-center font-bold text-xl uppercase">
                            Secure payment info
                          </h1>
                        </div>
                        <div className="mb-3 flex -mx-2"></div>
                        <div className="mb-3">
                          <label className="font-bold text-sm mb-2 ml-1">
                            Name on card
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="John Smith"
                              name="name"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="font-bold text-sm mb-2 ml-1">
                            Card number
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="0000 0000 0000 0000"
                              onChange={(e) => this.handleChange(e)}
                              type="text"
                              name="cardNo"
                            />
                          </div>
                        </div>
                        <div className="mb-3 -mx-2 flex items-end">
                          <div className="px-2 w-1/2">
                            <label className="font-bold text-sm mb-2 ml-1">
                              Expiration date
                            </label>
                            <div>
                              <select
                                name="month"
                                onChange={(e) => this.handleChange(e)}
                                className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                              >
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                              </select>
                            </div>
                          </div>
                          <div className="px-2 w-1/2">
                            <select
                              name="year"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                              <option value="20">2020</option>
                              <option value="21">2021</option>
                              <option value="22">2022</option>
                              <option value="23">2023</option>
                              <option value="24">2024</option>
                              <option value="25">2025</option>
                              <option value="26">2026</option>
                              <option value="27">2027</option>
                              <option value="28">2028</option>
                              <option value="29">2029</option>
                              <option value="30">2030</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-10">
                          <label className="font-bold text-sm mb-2 ml-1">
                            Security code
                          </label>
                          <div>
                            <input
                              className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="000"
                              min="0"
                              max="999"
                              type="text"
                              name="cvv"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              this.handlePayWithCard(
                                this.props.userId,
                                "customer@gmail.com",
                                "03121234123",
                                this.props.price,
                                this.props.courseId
                              );
                            }}
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                          >
                            {this.state.loading ? (
                              <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{ textAlign: "center" }}
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                />
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            ) : (
                              "PAY NOW"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={this.state.openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div className="">
                      <div
                        className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="mb-10">
                          <h1 className="text-center font-bold text-xl uppercase">
                            Secure payment info
                          </h1>
                        </div>
                        <div className="mb-3 flex -mx-2"></div>
                        <div className="mb-3">
                          <label className="font-bold text-sm mb-2 ml-1">
                            Jazz cash Account No
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="03*********"
                              type="text"
                              name="mobileNo"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="font-bold text-sm mb-2 ml-1">
                            Last six cnic Digits
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="00000"
                              type="text"
                              name="cnicDigits"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              this.handlePayWithMobileNo(
                                this.props.userId,
                                this.props.price,
                                this.props.courseId
                              );
                            }}
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                          >
                            {this.state.loading ? (
                              <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{ textAlign: "center" }}
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                />
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            ) : (
                              "PAY NOW"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PaymentTabs;
