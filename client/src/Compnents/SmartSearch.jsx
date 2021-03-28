import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

class SmartSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    await axios
      .get("/api/courses/searchByName/" + this.props.match.params.title)
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <section
          style={{
            backgroundColor: "black",
            height: 400,
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Smart Search
                </h3>
                <p className="text-lg text-shadow  ">
                  Get your courses or lecture by searching.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100">
          <br />
          <br />

          <div className="container">
            <div className="text-center pb-lg-4">
              <h2 className="m-4 font-bold">Search Results</h2>
              <p style={{ fontSize: 20 }}>
                Title: {this.props.match.params.title}
              </p>
              <p style={{ fontSize: 20 }}>
                Type: {this.props.match.params.filter}
              </p>
              <hr />
            </div>
          </div>
          <div className="container mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {this.state.data.length > 0 ? (
                this.state.data.map((data) => {
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
              ) : (
                <div className="container">
                  <div className="text-center pb-lg-4">
                    <h2 className="m-5 text-red-600">Op's Course not Found</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="container">
            <p className="font-medium" style={{ fontSize: 18 }}>
              About {this.state.data.length} results
            </p>
          </div>

          <br />
          <br />
        </section>
        <Footer />
      </>
    );
  }
}

export default SmartSearch;
