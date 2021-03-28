import React, { Component } from "react";

class QuizContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>
          <div
            className="title-course"
            style={{
              margin: "60px 78px 23px ",
              fontSize: "22px",
              fontWeight: 600,
              color: "#29303b",
            }}
          >
            Quiz
          </div>
        </div>
        <div
          className="accordion"
          style={{
            margin: "40px 78px 23px ",
            color: "#29303b",
          }}
        >
          {this.props.quiz.length > 0
            ? this.props.quiz.map((data, index) => {
                return (
                  <div className="w-full">
                    <input
                      type="checkbox"
                      name="panel"
                      id={`panel-${index + this.props.content.length + 1}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`panel-${index + this.props.content.length + 1}`}
                      className="relative block text-white p-3 shadow border-b border-grey"
                      style={{ backgroundColor: "#29303b" }}
                    >
                      {data.title}
                    </label>
                    <div
                      className="accordion__content overflow-hidden "
                      style={{ backgroundColor: "#f9f9f9" }}
                    >
                      <h2 className="accordion__header pt-4 pl-4">
                        {data.description}
                      </h2>
                      <h6 className="p-3 font-medium">
                        Total Marks: {data.totalMarks}
                      </h6>
                      <br />
                      <br />
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </>
    );
  }
}

export default QuizContainer;
