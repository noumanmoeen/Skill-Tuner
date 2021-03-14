import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
class AddCourseCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
                            name="address_street"
                            placeholder="Name"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110"
                      >
                        Add Course
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
