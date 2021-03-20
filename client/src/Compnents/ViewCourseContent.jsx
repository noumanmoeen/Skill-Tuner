import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class ViewCourseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
    };
  }

  async componentDidMount() {
    await auth_axios
      .get("/api/courses/getAllCourses")
      .then((res) => {
        this.setState({ course: res.data });
      })
      .catch((err) => {
        throw err;
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
                    View / delete Course Content
                  </h2>
                </div>
                <form>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Select Course
                          </label>
                          {this.state.course.length > 0 ? (
                            <select
                              className="w-1/3 border bg-white rounded px-3 py-2 outline-none"
                              //   onChange={this.onSelectCourse}
                              //   disabled={this.state.courseSelected}
                            >
                              <option value="" disable selected>
                                Select course
                              </option>
                              {this.state.course.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    className="py-1"
                                    value={data._id}
                                  >
                                    {data.title}
                                  </option>
                                );
                              })}
                            </select>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div>
                  <div className="flex flex-wrap w-full md:w-full items-center h-auto  md:mx-auto bg-white shadow-lg h-auto rounded border-l-8 border-orange-500 my-6">
                    {/*       Header */}
                    <div className="flex p-3 pl-6 pr-6 w-full justify-between rounded-tr">
                      <div className="pt-0 mt-0 ">
                        <p className="font-extrabold text-xl text-gray-900">
                          title
                        </p>
                      </div>
                      <div className="flex ">
                        <img
                          src="https://image.flaticon.com/icons/svg/59/59254.svg"
                          alt=""
                          className="cursor-pointer h-4 w-4 opacity-25"
                        />
                      </div>
                    </div>
                    {/*  body    */}
                    <div className="px-6">
                      <p className="text-lg text-black font-bold">Objective:</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugit dolorum soluta laboriosam hic magnam? Sed
                        illo tempora officiis ut impedit eos, amet ipsa
                        consectetur voluptatum esse ducimus placeat, repellendus
                        cumque.
                      </p>
                      <p className="text-lg text-black font-bold">
                        Content Type:
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        link
                      </p>
                      <p className="text-lg text-black font-bold">
                        Lecture No:
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        no 1
                      </p>
                      <p className="text-lg text-black font-bold">
                        description:
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugit dolorum soluta laboriosam hic magnam? Sed
                        illo tempora officiis ut impedit eos, amet ipsa
                        consectetur voluptatum esse ducimus placeat, repellendus
                        cumque.
                      </p>
                      <p className="text-lg text-black font-bold">Resources:</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugit dolorum soluta laboriosam hic magnam? Sed
                        illo tempora officiis ut impedit eos, amet ipsa
                        consectetur voluptatum esse ducimus placeat, repellendus
                        cumque.
                      </p>
                      <p className="text-lg text-black font-bold">Video URL:</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugit dolorum soluta laboriosam hic magnam? Sed
                        illo tempora officiis ut impedit eos, amet ipsa
                        consectetur voluptatum esse ducimus placeat, repellendus
                        cumque.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default ViewCourseContent;
