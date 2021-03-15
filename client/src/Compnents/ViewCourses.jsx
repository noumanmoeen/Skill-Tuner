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
        console.log("this = ", result);

        result.forEach(update);
        function update(object) {
          object.category = object.category.name;
          object.action = (
            <button
              className=" hover:bg-pink-100 hover:text-pink-500 text-gray font-bold py-2 px-4 rounded-full"
              onClick={async () => {
                await auth_axios
                  .delete("/api/course/delete/" + object._id)
                  .then((res) => {
                    if (res.status == 200) {
                      setTimeout(() => {
                        toast.success("Course Deleted Successfully");
                        window.location.reload();
                      }, 1000);
                    } else {
                      toast.error("Course not deleted");
                    }
                  })
                  .catch((err) => {
                    if (
                      err.response &&
                      Array.isArray(err.response.data.messages)
                    ) {
                      const msgs = err.response.data.messages.map((v) =>
                        toast.error(v.msg)
                      );
                    }
                    throw err;
                  });
              }}
            >
              Delete
            </button>
          );
        }

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
            rows: result,
          },
        });
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
