import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class AddCourseCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
    };
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddCategory = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.name.length == 0) {
      this.setState({ loading: false });
      toast.error("Please enter name of category in field first");
    } else {
      auth_axios
        .post("/api/category/add", { name: this.state.name })
        .then((res) => {
          if (res.status == 200) {
            setTimeout(() => {
              toast.success("category added successfully!!");
              this.setState({ loading: false });
              window.location.reload();
            }, 1200);
          } else {
            toast.error("there is an error please try again later");
          }
        })
        .catch((err) => {
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
              this.setState({ loading: false });
            });
            this.setState({ errorMessages: msgs });
          }
          throw err;
        });
    }
  };
  render() {
    return (
      <>
        <div>
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
          <main
            className="justify-center flex-1 py-10 px-10"
            style={{ paddingBottom: "1rem" }}
          >
            <h1 className="text-3xl font-bold text-gray-600">Course</h1>
          </main>
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <main className="md:p-0  lg:px-8  ">
              <section className="bg-cream-lighter p-4 shadow">
                <div className="md:flex">
                  <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
                    Add new Course Category
                  </h2>
                </div>
                <form>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Category name
                          </label>
                          <input
                            className="w-1/3 shadow-inner p-2 border-0"
                            type="text"
                            name="name"
                            onChange={(e) => this.handleOnChange(e)}
                            placeholder="Name"
                          />
                        </div>
                      </div>

                      <button
                        onClick={(e) => this.handleAddCategory(e)}
                        type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md  bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                      >
                        {this.state.loading ? (
                          <svg
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
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
                        ) : null}
                        Add Category
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default AddCourseCategory;
