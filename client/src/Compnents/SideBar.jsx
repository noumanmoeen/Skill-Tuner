import React, { Component } from "react";

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
    this.props.history.push("/login");
  };
  render() {
    return (
      <nav className="flex flex-col fixed inset-y-0 bg-white w-20 md:w-72 transition-all">
        <a
          href="#"
          className="flex flex-col items-center text-xl py-4 shadow-sm justify-center font-bold text-gray-600"
        >
          <div>
            {/* <i className="las la-mountain h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" /> */}
            <span className="hidden md:inline-flex">Skill Tuner</span>
          </div>
          <div className="hidden md:inline-flex text-sm font-normal">
            Admin Pannel
          </div>
        </a>
        <div className="flex flex-col h-full overflow-y-auto">
          <ul className="p-4 flex-grow">
            <li className="sidebar-menu-item">
              <a
                href="#"
                className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
              >
                <i className="las la-home h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a
                href="#"
                className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
              >
                <i className="lar la-chart-bar h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Add Courses</span>
              </a>
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
                <i className="las la-receipt h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Add Content</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a
                href="#"
                className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
              >
                <i className="las la-calendar h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Add Quiz</span>
              </a>
            </li>

            <li className="sidebar-menu-item">
              <a
                href="#"
                className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
              >
                <i className="las la-calendar h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Users</span>
              </a>
            </li>

            <li className="sidebar-menu-item">
              <a
                href="#"
                className="flex p-3 items-center text-gray-600 hover:bg-pink-100 rounded-lg hover:text-pink-800"
              >
                <i className="las la-cog h-8 w-8 text-2xl inline-flex items-center justify-center mr-4" />
                <span className="hidden md:inline-flex">Settings</span>
              </a>
            </li>
          </ul>

          <ul className="p-4">
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
    );
  }
}

export default SideBar;
