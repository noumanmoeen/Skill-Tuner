import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import FourZeroFour from "./Compnents/404";
import Header from "./Compnents/Header";
import Home from "./Compnents/Home";
import Login from "./Compnents/Login";
import SideBar from "./Compnents/SideBar";
import Signup from "./Compnents/Signup";
import UserLogin from "./Compnents/UserLogin";
import Users from "./Compnents/Users";
import UserSignup from "./Compnents/UserSignup";
import auth_axios from "./utils/auth_axios";
import url from "./utils/url_config";

class App extends React.Component {
  constructor(props) {
    super(props);

    // preserve state on login
    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
      userLogIn: localStorage.getItem("userToken") ? true : false,
    };
    if (this.state.loggedIn) {
      auth_axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }

    if (this.state.userLogIn) {
      auth_axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("userToken");
    }
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleLoggedOut = this.handleLoggedOut.bind(this);
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this);
    this.handleUserLoggedOut = this.handleUserLoggedOut.bind(this);
  }

  handleUserLoggedIn() {
    this.setState({ userLogIn: true });
    auth_axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("userToken");
  }

  handleLoggedIn() {
    this.setState({ loggedIn: true });

    // set the token
    auth_axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }

  handleLoggedOut() {
    this.setState({ loggedIn: false });

    // remove the token
    auth_axios.defaults.headers.common["Authorization"] = null;
  }

  handleUserLoggedOut() {
    this.setState({ userLogIn: false });

    // remove the token
    auth_axios.defaults.headers.common["Authorization"] = null;
  }

  // get the token
  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem("token") ? true : false,
      userLogIn: localStorage.getItem("userToken") ? true : false,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={url.users}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.setting}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.addCourseCategory}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.addCourse}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.viewCourses}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.addCourseContent}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.addQuiz}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.viewCourseContent}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                />
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />

          <Route
            exact
            path={url.login}
            render={(props) => {
              return this.state.loggedIn ? (
                <Redirect
                  to={url.dashboard}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Login {...props} whenLoggedIn={this.handleLoggedIn} />
              );
            }}
          />

          <Route
            exact
            path={url.userLogin}
            render={(props) => {
              console.log(this.state.userLogIn);
              return this.state.userLogIn ? (
                <Redirect
                  to={url.home}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <UserLogin {...props} whenLoggedIn={this.handleUserLoggedIn} />
              );
            }}
          />
          <Route exact path={url.register} component={Signup} />

          <Route exact path={url.userSignup} component={UserSignup} />
          <Route
            exact
            path={url.dashboard}
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                  id={localStorage.getItem("_id")}
                  isloggedIn={this.state.loggedIn}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Redirect to={url.login} />
              );
            }}
          />
          <Route
            exact
            path="/"
            render={(props) => {
              return <Redirect to={url.home} />;
            }}
          />
          <Route
            exact
            path={[
              url.home,
              url.about,
              url.contact,
              url.viewAllCourse,
              url.smartSearch,
              url.courseDetails,
            ]}
            render={(props) => {
              return this.state.userLogIn ? (
                <Header
                  {...props}
                  whenLoggedOut={this.handleUserLoggedOut}
                  _id={localStorage.getItem("user_id")}
                  isloggedIn={this.state.userLogIn}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Header {...props} isloggedIn={this.state.userLogIn} />
              );
            }}
          />
          <Route
            exact
            path={[url.todoList, url.myCourses, url.quiz, url.userSettings]}
            render={(props) => {
              return this.state.userLogIn ? (
                <Header
                  {...props}
                  whenLoggedOut={this.handleUserLoggedOut}
                  _id={localStorage.getItem("user_id")}
                  isloggedIn={this.state.userLogIn}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Redirect to={url.userLogin} />
              );
            }}
          />

          <Route
            exact
            path={url.leaderBoard}
            render={(props) => {
              return this.state.userLogIn ? (
                <Header
                  {...props}
                  whenLoggedOut={this.handleUserLoggedOut}
                  _id={localStorage.getItem("user_id")}
                  isloggedIn={this.state.userLogIn}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Redirect to={url.userLogin} />
              );
            }}
          />
          <Route component={FourZeroFour} />
        </Switch>
      </Router>
    );
  }
}

export default App;
