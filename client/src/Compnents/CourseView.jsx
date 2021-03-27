import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../utils/url_config";

class CourseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("/api/courses/getAllCourses")
      .then((res) => {
        this.setState({ courses: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <section className={this.props.home ? null : "bg-gray-100"}>
          {this.props.home ? null : (
            <>
              {" "}
              <br /> <br /> <br />
            </>
          )}
          {this.props.home ? (
            <div className="container">
              <div className="text-center pb-lg-4">
                <h2 className="m-5 font-bold">Browse Courses</h2>
              </div>
            </div>
          ) : null}

          <div className="container mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {this.state.courses.length > 0 ? (
                this.props.home ? (
                  this.state.courses.slice(0, 6).map((data) => {
                    return (
                      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                          <Link to={`/Courses/${data.title}/details`}>
                            <img
                              alt="Placeholder"
                              className="block h-auto w-full"
                              src={
                                "/api/getCourse/cover/" +
                                data.coverPicture.replace(/^.*[\\\/]/, "")
                              }
                            />
                          </Link>
                          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                              <Link
                                className="no-underline hover:underline text-black"
                                to={`/Courses/${data.title}/details`}
                              >
                                {data.title}
                              </Link>
                            </h1>
                            <p className="text-grey-darker text-sm">
                              Duration: {data.duration}
                            </p>
                          </header>
                          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black">
                              <p className="ml-2 text-sm">{data.subject}</p>
                            </a>
                            <a
                              className="no-underline text-grey-darker hover:text-red-dark"
                              href="#"
                            >
                              <span className="hidden">Like</span>
                              <i className="fa fa-heart" />
                            </a>
                          </footer>
                        </article>
                      </div>
                    );
                  })
                ) : (
                  this.state.courses.map((data) => {
                    return (
                      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                          <Link to={`/Courses/${data.title}/details`}>
                            <img
                              alt="Placeholder"
                              className="block h-auto w-full"
                              src={
                                "/api/getCourse/cover/" +
                                data.coverPicture.replace(/^.*[\\\/]/, "")
                              }
                            />
                          </Link>
                          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                              <Link
                                className="no-underline hover:underline text-black"
                                to={`/Courses/${data.title}/details`}
                              >
                                {data.title}
                              </Link>
                            </h1>
                            <p className="text-grey-darker text-sm">
                              Duration: {data.duration}
                            </p>
                          </header>
                          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a
                              className="flex items-center no-underline hover:underline text-black"
                              href="#"
                            >
                              <p className="ml-2 text-sm">{data.subject}</p>
                            </a>
                            <a
                              className="no-underline text-grey-darker hover:text-red-dark"
                              href="#"
                            >
                              <span className="hidden">Like</span>
                              <i className="fa fa-heart" />
                            </a>
                          </footer>
                        </article>
                      </div>
                    );
                  })
                )
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
          {this.props.home ? (
            <div class="text-center mt-5">
              <a href={url.viewAllCourse} class="btn btn-outline-primary">
                See all
              </a>
            </div>
          ) : null}
          {this.props.home ? null : (
            <>
              {" "}
              <br /> <br /> <br />
            </>
          )}
        </section>
      </>
    );
  }
}

export default CourseView;
