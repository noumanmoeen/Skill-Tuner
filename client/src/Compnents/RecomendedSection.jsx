import React, { Component } from "react";

class RecomendedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div
          className="outer-course-likes"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 600,
            color: "#29303b",
          }}
        >
          <div
            className="like-course-title"
            style={{
              marginBottom: "27px",
              marginLeft: "108px",
              wordBreak: "break-word",
              maxWidth: "calc(70vw)",
            }}
          >
            Some courses you might like
          </div>
        </div>
      </>
    );
  }
}

export default RecomendedSection;
