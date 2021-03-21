import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
      </>
    );
  }
}

export default Home;
