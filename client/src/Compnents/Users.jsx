import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import auth_axios from "./../utils/auth_axios";
import { ToastContainer, toast } from "react-toastify";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      updated: false,
    };
  }

  async componentDidMount() {
    auth_axios
      .get("/api/users/getAllUsers/:_id", {
        params: {
          _id: this.props.id,
        },
      })
      .then((res) => {
        const result = res.data;

        result.forEach(update);
        function update(object) {
          object.action = (
            <button
              className=" hover:bg-pink-100 hover:text-pink-500 text-gray font-bold py-2 px-4 rounded-full"
              onClick={async () => {
                await auth_axios
                  .put("/api/users/updateRole/" + object._id)
                  .then((res) => {
                    if (res.status == 200) {
                      setTimeout(() => {
                        toast.success(
                          "User role changes to admin successfully"
                        );
                        window.location.reload();
                      }, 1000);
                    } else {
                      toast.error("User role is not changed");
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
              Make Admin
            </button>
          );
        }

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
            rows: res.data,
          },
        });
      });
  }
  render() {
    return (
      <>
        <div className="">
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
            <h1 className="text-3xl font-bold text-gray-600">Users</h1>
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

export default Users;
