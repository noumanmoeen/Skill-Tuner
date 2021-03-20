import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class ViewCourseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      courseSelected: false,
      courseId: "",
      content: [],
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

  onSelectCourse = async (e) => {
    this.setState({ courseId: e.target.value });
    if (e.target.value.length > 0) {
      await auth_axios
        .get("/api/courses/getContentById/" + e.target.value)
        .then((res) => {
          this.setState({ courseSelected: true, content: res.data.content });
        })
        .catch((err) => {
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
            });
            this.setState({ loading: false });
            this.setState({ errorMessages: msgs });
          }
          throw err;
        });
    } else {
      this.setState({ courseSelected: false });
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
                              onChange={this.onSelectCourse}
                              disabled={this.state.courseSelected}
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
                  {this.state.courseSelected
                    ? this.state.content.length > 0
                      ? this.state.content.map((data, key) => {
                          return (
                            <div className="flex flex-wrap w-full md:w-full items-center h-auto  md:mx-auto bg-white shadow-lg h-auto rounded border-l-8 border-orange-500 my-6">
                              {/*       Header */}
                              <div className="flex p-3 pl-6 pr-6 w-full justify-between rounded-tr">
                                <div className="pt-0 mt-0 ">
                                  <p className="font-extrabold text-xl text-gray-900">
                                    {data.title}
                                  </p>
                                </div>
                                <div className="flex ">
                                  <svg
                                    id="Layer_1"
                                    className="hover:text-gray-400 cursor-pointer"
                                    enableBackground="new 0 0 512 512"
                                    height={23}
                                    viewBox="0 0 512 512"
                                    width={23}
                                    // onClick={this.hanc}
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z" />
                                      <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                                      <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                                      <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              {/*  body    */}
                              <div className="px-6">
                                <p className="text-lg text-black font-bold">
                                  Objective:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.learningObjective}
                                </p>
                                <p className="text-lg text-black font-bold">
                                  Content Type:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.type}
                                </p>
                                <p className="text-lg text-black font-bold">
                                  Lecture No:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.lectureNo}
                                </p>
                                <p className="text-lg text-black font-bold">
                                  description:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.description}
                                </p>
                                <p className="text-lg text-black font-bold">
                                  Resources:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.resources}
                                </p>
                                <p className="text-lg text-black font-bold">
                                  Video URL:
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  {data.url}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : null
                    : null}
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
