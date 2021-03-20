import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
import { Bar } from "react-chartjs-2";
// todo: adding data in charts comming from mongodb
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfAdmins: 0,
      noOfUsers: 0,
      noOfBlock: 0,
      noOfCourses: 0,
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "to be decided",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }

  async componentDidMount() {
    await auth_axios
      .post("/api/users/getNoOfAdmins", {})
      .then((res) => {
        this.setState({ noOfAdmins: res.data.length });
      })
      .catch((err) => {
        console.log(err);
      });

    await auth_axios
      .post("/api/users/getNoOfUsers", {})
      .then((res) => {
        this.setState({ noOfUsers: res.data.length });
      })
      .catch((err) => {
        console.log(err);
      });

    await auth_axios
      .post("/api/users/getNoOfBlockUsers", {})
      .then((res) => {
        this.setState({ noOfBlock: res.data.length });
      })
      .catch((err) => {
        console.log(err);
      });

    await auth_axios
      .get("/api/courses/getAllCourses")
      .then((res) => {
        this.setState({ noOfCourses: res.data.length });
      })
      .catch((err) => {
        console.log(err);
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
            <h1 className="text-3xl font-bold text-gray-600">DashBoard</h1>
          </main>
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <main className="md:p-0  lg:px-8  ">
              <div className=" w-full bg-white border border-gray-300 border-solid rounded shadow">
                <section className=" flex w-full flex-row flex-wrap items-center text-center border-b border-solid border-gray-300">
                  <div className="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Total Users
                    </span>
                    <div className="py-4 flex items-center justify-center text-center">
                      <span className="mr-4 text-3xl">
                        {this.state.noOfUsers}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Total Admins
                    </span>
                    <div className="py-4 flex items-center justify-center text-center">
                      <span className="mr-4 text-3xl">
                        {this.state.noOfAdmins}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Total Courses
                    </span>
                    <div className="py-4 flex items-center justify-center text-center">
                      <span className="mr-4 text-3xl">
                        {this.state.noOfCourses}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r flex flex-col items-center">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Total Blocked Users
                    </span>
                    <span className="block py-4 text-gray-500 text-3xl">
                      {this.state.noOfBlock}
                    </span>
                  </div>
                </section>
                <section id="chart" className="p-4">
                  <Bar data={this.state.data} />
                </section>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
