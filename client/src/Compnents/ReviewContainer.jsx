import React, { Component } from "react";

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div
          className="review-form-box"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="make-review-title"
            style={{
              margin: "80px 130px 40px 130px",
              fontSize: "22px",
              fontWeight: 600,
              color: "#29303b",
            }}
          >
            Add a Review
          </div>
          <textarea
            className=""
            style={{
              width: "600px",
              resize: "none",
              height: "200px",
              marginBottom: "30px",
              border: "1px solid black",
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-200"
            style={{ fontSize: "15px", padding: "12px 54px" }}
          >
            Make Review
          </button>
        </div>
      </>
    );
  }
}

export default ReviewContainer;
