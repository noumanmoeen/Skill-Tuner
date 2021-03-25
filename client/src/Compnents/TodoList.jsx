import React, { Component } from "react";
import auth_axios from "../utils/auth_axios";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todoList: [], task: "" };
  }

  async componentDidMount() {
    await auth_axios
      .get("/api/users/todoTask/get/" + this.props._id)
      .then((res) => {
        console.log(res.data.todolist);
        this.setState({ todoList: res.data.todolist });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleAddTask = async (e) => {
    e.preventDefault();
    if (this.state.task.length === 0) {
      toast.error("please enter task....");
    } else {
      await auth_axios
        .post("/api/users/todoTask/add", {
          _id: this.props._id,
          todolist: {
            title: "task",
            description: this.state.task,
            status: "Created",
          },
        })
        .then(async (res) => {
          if (res.status === 200) {
            toast.success("task added successfully");
            // update the list of tasks
            await auth_axios
              .get("/api/users/todoTask/get/" + this.props._id)
              .then((res) => {
                this.setState({ todoList: res.data.todolist, task: "" });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            toast.error("there is error in task addition");
          }
        })
        .catch((err) => {
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
            });
            this.setState({ errorMessages: msgs });
          }
          throw err;
        });
    }
  };
  handleTaskDone = async (taskId) => {
    await auth_axios
      .put("/api/users/todoTask/changeStatusToDone", {
        _id: this.props._id,
        taskId: taskId,
      })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success("Task Completed");
          await auth_axios
            .get("/api/users/todoTask/get/" + this.props._id)
            .then((res) => {
              this.setState({ todoList: res.data.todolist });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Error in change the status");
        }
      })
      .catch((err) => {
        if (err.response && Array.isArray(err.response.data.messages)) {
          const msgs = err.response.data.messages.map((v) => {
            toast.error(v.msg);
          });
          this.setState({ errorMessages: msgs });
        }
        throw err;
      });
  };

  handleTaskDelete = async (taskId) => {
    await auth_axios
      .delete("/api/users/" + this.props._id + "/todoTask/delete/" + taskId)
      .then(async (res) => {
        if (res.status === 200) {
          toast.success("Task Completed");
          await auth_axios
            .get("/api/users/todoTask/get/" + this.props._id)
            .then((res) => {
              this.setState({ todoList: res.data.todolist });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Error in change the status");
        }
      })
      .catch((err) => {
        if (err.response && Array.isArray(err.response.data.messages)) {
          const msgs = err.response.data.messages.map((v) => {
            toast.error(v.msg);
          });
          this.setState({ errorMessages: msgs });
        }
        throw err;
      });
  };
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
        <div className="mx-auto max-w-md mt-8  rounded shadow-lg flex flex-col">
          <form className="flex">
            <input
              id="todoInput"
              type="text"
              name="task"
              onChange={(e) => this.handleChange(e)}
              value={this.state.task}
              className="flex-grow m-1 rounded border-2 border-gray-700 focus:outline-none focus:ring focus:border-green-700"
              placeholder="Add task..."
            />
            <button
              onClick={(e) => this.handleAddTask(e)}
              id="todoSubmit"
              className="p-2 m-1 rounded shadow bg-gray-700 text-white hover:bg-green-700"
            >
              Add
            </button>
          </form>
        </div>
        <div className="w-2/3 mx-auto shadow-lg rounded">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse">
              {" "}
              {/*Border collapse doesn't work on this site yet but it's available in newer tailwind versions */}
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-4 px-6 w-full bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Task
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Action
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.todoList.length > 0
                  ? this.state.todoList.map((data) => {
                      return (
                        <tr className="hover:bg-grey-lighter">
                          <td className="py-4 px-6 border-b border-grey-light">
                            {data.status === "Done" ? (
                              <strike> {data.description}</strike>
                            ) : (
                              <> {data.description} </>
                            )}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            <a
                              onClick={() => this.handleTaskDone(data._id)}
                              className=" py-3 px-3 rounded text-xs "
                              style={{
                                backgroundColor:
                                  "rgba(55, 65, 81, var(--tw-bg-opacity))",
                              }}
                            >
                              <i
                                class="fa fa-check"
                                style={{ fontSize: 15, color: "white" }}
                              ></i>
                            </a>
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            <a
                              onClick={() => this.handleTaskDelete(data._id)}
                              className=" py-3 px-3 rounded text-xs "
                              style={{
                                backgroundColor:
                                  "rgba(55, 65, 81, var(--tw-bg-opacity))",
                              }}
                            >
                              <i
                                class="fa fa-trash"
                                style={{ fontSize: 15, color: "white" }}
                              ></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </>
    );
  }
}

export default TodoList;
