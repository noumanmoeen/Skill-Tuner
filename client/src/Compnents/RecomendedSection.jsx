import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecomendedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div
          className="outer-course-likes bg-gray-100"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 600,
            color: "#29303b",
          }}
        >
          <div
            className="like-course-title"
            style={{
              marginBottom: "7px",
              marginTop: "20px",
              marginLeft: "108px",
              wordBreak: "break-word",
              maxWidth: "calc(70vw)",
            }}
          >
            Some courses you might like
          </div>
        </div>
        <section className="bg-gray-100">
          <br />
          <br />
          <div className="container mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {this.props.category.length > 0
                ? this.props.category.slice(0, 3).map((data) => {
                    return (
                      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg">
                          <Link to={`/Courses/${data._id}/details`}>
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
                                to={`/Courses/${data._id}/details`}
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
                  })
                : null}
            </div>
          </div>
          <br />
          <br />
          <br />
        </section>
      </>
    );
  }
}

export default RecomendedSection;
