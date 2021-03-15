import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import auth_axios from "../utils/auth_axios";
class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    auth_axios
      .get("/api/courses/getAllCourses")
      .then((res) => {
        const result = res.data;
        this.setState({
          data: {
            columns: [
              {
                label: "Course Name",
                field: "title",
                sort: "asc",
                width: 150,
              },
              {
                label: "Subject",
                field: "subject",
                sort: "asc",
                width: 270,
              },
              {
                label: "Category",
                field: "category",
                sort: "asc",
                width: 200,
              },
              {
                label: "Duration",
                field: "duration",
                sort: "asc",
                width: 100,
              },
              {
                label: "Skills",
                field: "skills",
                sort: "asc",
                width: 150,
              },
              {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 100,
              },
            ],
            rows: res.data,
          },
        });
        console.log(res.data);
      })
      .catch((err) => {});
  }
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
            <h1 className="text-3xl font-bold text-gray-600">View Courses</h1>
          </main>
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <MDBDataTable
              className="justify-center flex-1 px-16"
              striped
              bordered
              small
              responsive
              data={this.state.data}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ViewCourses;
