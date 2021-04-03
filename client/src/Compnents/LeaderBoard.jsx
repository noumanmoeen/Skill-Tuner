import React, { Component } from "react";
import auth_axios from "../utils/auth_axios";
import { MDBDataTable } from "mdbreact";
import Footer from "./Footer";
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      data: {},
    };
  }

  async componentDidMount() {
    await auth_axios
      .post("/api/users/getTopPerformers")
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        let result = [];
        let rank = 0;
        let previous_marks = 0;
        data.forEach((element) => {
          rank += 1;
          const value = {};
          value.rank = rank;
          value.firstname = element.firstname;
          value.lastname = element.lastname;
          value.email = element.email;
          value.username = element.username;
          element.courses.forEach((ele) => {
            previous_marks += ele.marksGain;
          });
          value.score = previous_marks;
          previous_marks = 0;
          result.push(value);
        });

        this.setState({
          data: {
            columns: [
              {
                label: "Rank",
                field: "rank",
                sort: "asc",
                width: 150,
              },
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
                label: "Score",
                field: "score",
                sort: "asc",
                width: 150,
              },
            ],
            rows: result,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <section
          style={{
            height: 400,
            backgroundColor: "black",
          }}
          className="d-flex align-items-center dark-overlay bg-cover"
        >
          <div className="container py-6 py-lg-7 text-white overlay-content text-center">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <h3 className="display-5 font-weight-bold text-shadow">
                  Leader Board
                </h3>
                <p className="text-lg text-shadow  ">List of top Performers.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 md:px-12 ">
            <br />
            <br />
            <br />
            <MDBDataTable
              className="justify-center flex-1 px-16"
              striped
              bordered
              small
              responsive
              data={this.state.data}
            />

            <br />
            <br />
            <br />
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default LeaderBoard;
