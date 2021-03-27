import React, { Component } from "react";
import CourseView from "./CourseView";
import Footer from "./Footer";

class ViewAllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <section
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80)",
            height: 400,
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Courses
                </h3>
                <p className="text-lg text-shadow  ">
                  Learn any course and train your skills with out any cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CourseView home={false} />

        <Footer />
      </>
    );
  }
}

export default ViewAllCourses;
