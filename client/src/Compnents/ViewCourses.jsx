import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
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
          <h1 className="text-3xl font-bold text-gray-600">Courses</h1>
        </main>
      </>
    );
  }
}

export default ViewCourses;
