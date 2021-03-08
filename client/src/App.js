import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Compnents/Login";
import SideBar from "./Compnents/SideBar";
import Signup from "./Compnents/Signup";
import auth_axios from "./utils/auth_axios";

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
            path="/login"
            render={(props) => {
              return this.state.loggedIn ? (
                <Redirect to="/dashboard" /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Login {...props} whenLoggedIn={this.handleLoggedIn} />
              );
            }}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/dashboard"
            render={(props) => {
              return this.state.loggedIn ? (
                <SideBar
                  {...props}
                  whenLoggedOut={this.handleLoggedOut}
                /> /*if user is login then redirect user to dashboard*/
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
