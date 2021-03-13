import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import url from "./../utils/url_config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./Users";
import Settings from "./Settings";
import AddCourse from "./AddCourses";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    this.props.whenLoggedOut();
    this.props.history.push(url.login);
  };
  render() {
    return (
      <div className="flex">
        <Router>
          <nav className="flex flex-col min-h-screen inset-y-0 bg-white w-20 md:w-72 transition-all">
            <a
              href="#"
              className="flex flex-col items-center text-xl py-4 shadow-sm justify-center font-bold text-gray-600 border"
            >
              <div>
                <span className="hidden md:inline-flex">Skill Tuner</span>
              </div>
              <div className="hidden md:inline-flex text-sm font-normal">
                Admin Pannel
              </div>
            </a>
            <div className="flex flex-col h-full overflow-y-auto">
              <ul className="p-4 flex-grow border">
                <li className="sidebar-menu-item">
                  <Link
                    to={url.dashboard}
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-home h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Dashboard</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    to={url.addCourse}
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-plus h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Add Courses</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    href="#"
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-user h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">View Courses</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    href="#"
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-plus h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Add Content</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    href="#"
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-plus h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Add Quiz</span>
                  </a>
                </li>

                <li className="sidebar-menu-item">
                  <Link
                    to={url.users}
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-user h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Users</span>
                  </Link>
                </li>

                <li className="sidebar-menu-item">
                  <Link
                    to={url.setting}
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                  >
                    <i className="las la-cog h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Settings</span>
                  </Link>
                </li>
              </ul>

              <ul className="p-4 border">
                <li className="sidebar-menu-item">
                  <a
                    href="#"
                    className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
                    onClick={(e) => this.handleLogout(e)}
                  >
                    <i className="las la-sign-out-alt h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                    <span className="hidden md:inline-flex">Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path={url.dashboard}>
              <Dashboard />
            </Route>
            <Route path={url.users}>
              <Users userId={this.props.id} />
            </Route>
            <Route path={url.setting}>
              <Settings userId={this.props.id} />
            </Route>
            <Route path={url.addCourse}>
              <AddCourse userId={this.props.id} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default SideBar;
