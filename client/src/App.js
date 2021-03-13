import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Login from "./Compnents/Login";
import SideBar from "./Compnents/SideBar";
import Signup from "./Compnents/Signup";
import Users from "./Compnents/Users";
import auth_axios from "./utils/auth_axios";
import url from "./utils/url_config";

class App extends React.Component {
  constructor(props) {
    super(props);

    // preserve state on login
    this.state = { loggedIn: localStorage.getItem("token") ? true : false };
    if (this.state.loggedIn) {
      auth_axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleLoggedOut = this.handleLoggedOut.bind(this);
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

  // get the token
  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem("token") ? true : false });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
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
          <Route path={url.register} component={Signup} />
          <Route
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
        </Switch>
      </Router>
    );
  }
}

export default App;
