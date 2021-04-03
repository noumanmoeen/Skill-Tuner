import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import url from "../utils/url_config";
import About from "./About";
import ChatBotComponent from "./ChatBotComponent";
import Contact from "./Contact";
import CourseDetails from "./CourseDetails";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import MyCourses from "./MyCourses";
import Quiz from "./Quiz";
import SmartSearch from "./SmartSearch";
import TodoList from "./TodoList";
import ViewAllCourses from "./ViewAllCourses";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: false };
  }

  render() {
    return (
      <>
        <ChatBotComponent />
        <Router>
          <nav className="nav sticky flex flex-wrap items-center justify-between px-4 shadow-sm">
            <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
              <svg
                className="w-10 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 225 225"
                fill="black"
                style={{ enableBackground: "new 0 0 225 225" }}
                xmlSpace="preserve"
              >
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                  }}
                />
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path
                      id="Layer0_0_1_STROKES"
                      className="st0"
                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                    />
                  </g>
                </g>
              </svg>
              <span className="font-semibold ml-3 text-xl tracking-tight">
                Skill Tuner
              </span>
              <span></span>
            </div>

            <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label
              className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
              htmlFor="menu-btn"
            >
              <span className="navicon bg-grey-darkest flex items-center relative" />
            </label>
            <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
              <li className="border-t md:border-none">
                <Link
                  to={url.home}
                  className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                >
                  Home
                </Link>
              </li>
              <li className="border-t md:border-none">
                <Link
                  to={url.about}
                  className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                >
                  Faq's
                </Link>
              </li>
              <li className="border-t md:border-none">
                <Link
                  to={url.contact}
                  className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                >
                  Contact
                </Link>
              </li>
              {this.props.isloggedIn ? (
                <>
                  <li className="border-t md:border-none">
                    <Link
                      to={url.todoList}
                      className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                    >
                      Todo List
                    </Link>
                  </li>
                  <li className="border-t md:border-none">
                    <Link
                      to={url.leaderBoard}
                      className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                    >
                      LeaderBoard
                    </Link>
                  </li>
                  <li className="border-t md:border-none">
                    <Link
                      to={url.myCourses}
                      className="block md:inline-block px-3 py-3 no-underline text-black hover:text-gray-500 font-bold"
                    >
                      My Courses
                    </Link>
                  </li>
                  <li>
                    <div className="ml-3" style={{ marginTop: "10px" }}>
                      <div>
                        <button
                          type="button"
                          className="bg-white  flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          id="user-menu"
                          aria-expanded="false"
                          aria-haspopup="true"
                          onClick={() => {
                            this.setState({ menu: !this.state.menu });
                          }}
                        >
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://img.icons8.com/metro/26/000000/user-male.png"
                            alt=""
                          />
                        </button>
                      </div>

                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                        style={this.state.menu ? null : { display: "none" }}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <li className="border-t md:border-none">
                  <Link
                    to={url.userLogin}
                    onClick={() => this.props.history.push(url.userLogin)}
                    style={{ transition: "all 0.15s ease 0s" }}
                    className="block md:inline-block px-3 py-3 no-underline text-black hover:text-white hover:bg-red-600 font-bold"
                  >
                    Login <i className="fas fa-arrow-right ml-1" />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <Switch>
            <Route path={url.home}>
              <Home _id={this.props._id} />
            </Route>
            <Route path={url.todoList}>
              <TodoList _id={this.props._id} />
            </Route>
            <Route path={url.leaderBoard}>
              <LeaderBoard _id={this.props._id} />
            </Route>
            <Route path={url.about}>
              <About _id={this.props._id} />
            </Route>
            <Route path={url.contact}>
              <Contact _id={this.props._id} />
            </Route>
            <Route path={url.viewAllCourse}>
              <ViewAllCourses _id={this.props._id} />
            </Route>
            <Route exact path={url.quiz} component={Quiz} />
            <Route exact path={url.smartSearch} component={SmartSearch} />
            <Route exact path={url.courseDetails} component={CourseDetails} />
            <Route path={url.myCourses}>
              <MyCourses _id={this.props._id} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Header;
