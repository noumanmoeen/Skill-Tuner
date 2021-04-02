import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../utils/url_config";
import CourseView from "./CourseView";
import FeatureVideos from "./FeatureVideos";
import Footer from "./Footer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "query",
      type: "all",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <section
          style={{
            backgroundImage: "url(https://i.postimg.cc/28PPDSwP/course.jpg)",
            height: 500,
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Skill Tuner
                </h3>
                <p className="text-lg text-shadow  ">
                  Gateway to knowledge, freely available courses to enhanced
                  your skill set.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div
            className="rounded p-3 lg:p-4 relative mt-n5 z-20"
            style={{
              background: "#fff",
              boxShadow: "0 0 1rem rgb(0 0 0 / 15%)",
            }}
          >
            <div className="w-2/3 inline-block">
              <input
                className="appearance-none block md:w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-password"
                type="search"
                name="title"
                onChange={(e) => this.handleChange(e)}
                placeholder="Search for free courses and videos..."
              />
            </div>

            <div className="inline-block w-1/6 ml-2">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey outline-none"
                name="type"
                onChange={(e) => this.handleChange(e)}
                id="grid-state"
              >
                <option value="all">All</option>
                <option value="Courses">Courses</option>
                <option value="CourseTitle">Lecture Title</option>
              </select>
            </div>
            <div className="inline-block w-1/7 ml-1">
              <Link
                to={`/Search/${this.state.title}/${this.state.type}`}
                className="focus:outline-none text-white text-sm py-3 px-5 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
        <CourseView home={true} />
        <br />
        <br />

        <FeatureVideos />
        <Footer />
      </>
    );
  }
}

export default Home;
