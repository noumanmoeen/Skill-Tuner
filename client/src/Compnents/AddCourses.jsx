import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import auth_axios from "../utils/auth_axios";
class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { name: "programming", id: 1 },
        { name: "Seo", id: 2 },
        { name: "technicalWriting", id: 3 },
        { name: "photoShop", id: 4 },
        { name: "management", id: 5 },
        { name: "speaking", id: 6 },
        { name: "finance", id: 7 },
        { name: "Accounting", id: 8 },
        { name: "Microsoft office", id: 9 },
        { name: "Graphics", id: 10 },
      ],
      category: [],
    };
  }

  componentDidMount() {
    auth_axios
      .get("/api/category/getAllCategory")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
                    Add new Course
                  </h2>
                </div>
                <form>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Title
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="address_street"
                            placeholder="subject"
                          />
                        </div>
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Cover image
                          </label>
                          <input
                            className="w-full p-2"
                            type="file"
                            name="address_street"
                          />
                        </div>
                      </div>
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Subject
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="address_street"
                            placeholder="subject"
                          />
                        </div>
                        <div className="md:flex-1 md:pl-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Skills
                          </label>
                          <Multiselect
                            options={this.state.options} // Options to display in the dropdown
                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            // onSelect={this.onSelect} // Function will trigger on select event
                            // onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            selectionLimit="2"
                            placeholder="Select Skills"
                          />
                        </div>
                      </div>
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Duration
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="address_street"
                            placeholder="duration eg: 2-weeks"
                          />
                        </div>
                        <div className="md:flex-1 md:pl-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Category
                          </label>
                          <Multiselect
                            options={this.state.options} // Options to display in the dropdown
                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            // onSelect={this.onSelect} // Function will trigger on select event
                            // onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            singleSelect
                            placeholder="Select Category"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block uppercase tracking-wide text-xs font-bold">
                          Course Description:
                        </label>
                        <textarea
                          className="w-full shadow-inner p-2 border-0"
                          type="text"
                          rows="3"
                          name="oldPassword"
                          placeholder="Introduce your Course here."
                        />
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

export default AddCourse;
