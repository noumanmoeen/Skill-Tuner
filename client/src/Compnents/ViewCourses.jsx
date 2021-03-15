import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.setState({
      data: {
        columns: [
          {
            label: "First Name",
            field: "firstname",
            sort: "asc",
            width: 150,
          },
          {
            label: "Last Name",
            field: "lastname",
            sort: "asc",
            width: 270,
          },
          {
            label: "Username",
            field: "username",
            sort: "asc",
            width: 200,
          },
          {
            label: "Email",
            field: "email",
            sort: "asc",
            width: 100,
          },
          {
            label: "Role",
            field: "role",
            sort: "asc",
            width: 150,
          },
          {
            label: "Status",
            field: "status",
            sort: "asc",
            width: 100,
          },
          {
            label: "Action",
            field: "action",
            sort: "asc",
            width: 100,
          },
        ],
        rows: [],
      },
    });
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
            {/* <MDBDataTable
              className="justify-center flex-1 px-16"
              striped
              bordered
              small
              responsive
              data={this.state.data}
            /> */}
          </div>
        </div>
      </>
    );
  }
}

export default ViewCourses;
