import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class AddCourseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      courseSelected: false,
      courseId: "",
      title: "",
      url: "",
      learningObjective: "",
      resources: "",
      lectureNo: "",
      description: "",
      type: "",
      loading: false,
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

  onSelectCourse = (e) => {
    this.setState({ courseId: e.target.value });
    if (e.target.value.length > 0) {
      this.setState({ courseSelected: true });
    } else {
      this.setState({ courseSelected: false });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddForm = (e) => {
    e.preventDefault();
    if (
      this.state.title.length == 0 ||
      this.state.type.length == 0 ||
      this.state.learningObjective.length == 0 ||
      this.state.description.length == 0 ||
      this.state.lectureNo.length == 0
    ) {
      toast.error(
        "please Fill all fields while resources and url field is not mandatory!!"
      );
    } else {
      this.setState({ loading: true });
      auth_axios
        .post("/api/courses/addContent", {
          title: this.state.title,
          _id: this.state.courseId,
          type: this.state.type,
          url: this.state.url,
          learningObjective: this.state.learningObjective,
          resources: this.state.resources,
          lectureNo: this.state.lectureNo,
          description: this.state.description,
        })
        .then((res) => {
          if (res.status == 200) {
            setTimeout(() => {
              this.setState({ loading: false });
              toast.success("Content added to course successfully!!");
              window.location.reload();
            }, 1200);
          } else {
            toast.error("Content not added!!!");
            this.setState({ loading: false });
          }
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
                    Add Content in Course
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
                      {this.state.courseSelected == true ? (
                        <div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Title
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="title"
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Title eg :Introduction"
                              />
                            </div>
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Content type
                              </label>
                              <select
                                className="w-full border bg-white rounded px-3 py-2 outline-none"
                                name="type"
                                onChange={this.handleChange}
                              >
                                <option value="" selected disabled>
                                  Select Content type
                                </option>
                                <option value="Text">Text</option>
                                <option value="Link">Link</option>
                                <option value="Video">Video Link</option>
                              </select>
                            </div>
                          </div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Learning Objective
                              </label>
                              <textarea
                                className="w-full shadow-inner p-2 border-0"
                                name="learningObjective"
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="What will students be able to do in this section"
                              />
                            </div>
                          </div>

                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Software / Resourses
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="resources"
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Enter link of software if any have"
                              />
                            </div>
                            <div className="md:flex-1 md:pl-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Lecture no
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="lectureNo"
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="lecture no eg: lecture 1"
                              />
                            </div>
                          </div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Link of Content
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="url"
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Enter link of content eg: https://youtube.com"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block uppercase tracking-wide text-xs font-bold">
                              Detail Description:
                            </label>
                            <textarea
                              className="w-full shadow-inner p-2 border-0"
                              type="text"
                              rows="3"
                              name="description"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              placeholder="Content description here"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => this.handleAddForm(e)}
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
                            Save
                          </button>
                        </div>
                      ) : null}
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

export default AddCourseContent;
