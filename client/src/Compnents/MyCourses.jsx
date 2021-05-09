import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth_axios from "../utils/auth_axios";
import Footer from "./Footer";

class MyCourses extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }

  async componentDidMount() {
    if (localStorage.getItem("user_id")) {
      await auth_axios
        .get("/api/users/getEnrollCourses/" + localStorage.getItem("user_id"))
        .then((res) => {
          this.setState({ courses: res.data.courses });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <>
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
                  My Courses
                </h3>
                <p className="text-lg text-shadow  ">
                  List of Courses in which you are enrolled.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100">
          <>
            {" "}
            <br /> <br /> <br />
          </>

          <div className="container mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {this.state.courses.length > 0 ? (
                this.state.courses.map((data) => {
                  if (data._id) {
                    return (
                      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                          <Link to={`/Courses/${data._id._id}/details`}>
                            <img
                              alt="Placeholder"
                              className="block h-auto w-full"
                              src={
                                "/api/getCourse/cover/" +
                                data._id.coverPicture.replace(/^.*[\\\/]/, "")
                              }
                            />
                          </Link>
                          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                              <Link
                                className="no-underline hover:underline text-black"
                                to={`/Courses/${data._id._id}/details`}
                              >
                                {data._id.title}
                              </Link>
                            </h1>
                            <p className="text-grey-darker text-sm">
                              Duration: {data.duration}
                            </p>
                          </header>
                          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black">
                              <p className="ml-2 text-sm">{data._id.subject}</p>
                            </a>
                            <a
                              className="no-underline text-grey-darker hover:text-red-dark"
                              href="#"
                            >
                              <div className="flex items-center ml-2">
                                <svg
                                  className="w-3 h-3 fill-current text-yellow-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <svg
                                  className="w-3 h-3 fill-current text-yellow-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <svg
                                  className="w-3 h-3 fill-current text-yellow-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <svg
                                  className="w-3 h-3 fill-current text-yellow-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <svg
                                  className="w-3 h-3 fill-current text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              </div>
                            </a>
                          </footer>
                        </article>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="container">
                  <div className="text-center pb-lg-4">
                    <h2 className="m-5 text-red-600">
                      Op's No Courses available yet
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>

          <>
            {" "}
            <br /> <br /> <br />
          </>
        </section>

        <Footer />
      </>
    );
  }
}

export default MyCourses;
