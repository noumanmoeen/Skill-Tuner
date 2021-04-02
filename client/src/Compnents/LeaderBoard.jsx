import React, { Component } from "react";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </>
    );
  }
}

export default LeaderBoard;
