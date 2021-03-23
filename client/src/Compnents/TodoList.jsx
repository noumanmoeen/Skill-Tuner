import React, { Component } from "react";
import Footer from "./Footer";

class TodoList extends Component {
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
              "url(https://i.postimg.cc/j5wLywFP/glenn-carstens-peters-RLw-UC03-Gwc-unsplash.jpg)",
            height: 400,
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Todo List
                </h3>
                <p className="text-lg text-shadow  ">
                  Write and Track your task here.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default TodoList;
