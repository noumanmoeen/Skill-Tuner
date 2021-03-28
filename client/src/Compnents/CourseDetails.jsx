import axios from "axios";
import React, { Component } from "react";
import CourseContentContainer from "./CourseContentContainer";
import Footer from "./Footer";
import QuizContainer from "./QuizContainer";
import ReadReviewContainer from "./ReadReviewContainer";
import RecomendedSection from "./RecomendedSection";
import ReviewContainer from "./ReviewContainer";

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, content: [], quiz: [] };
  }

  async componentDidMount() {
    await axios
      .get("/api/courses/searchById/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          data: res.data,
          content: res.data.content,
          quiz: res.data.quiz,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#505763",
            background: "linear-gradient(#29303B, #29303B, #29303B)",
            padding: "50px 100px",
            color: "#fff",
            minWidth: "780px",
          }}
        >
          <div className="container">
            <div
              style={{
                fontSize: "36px",
                lineHeight: "41px",
                fontFamily: "inherit",
                paddingBottom: "15px",
                marginTop: 20,
              }}
            >
              {this.state.data.title}
            </div>
            <div
              style={{
                fontSize: "21px",
                lineHeight: "27px",
                fontFamily: "inherit",
                paddingBottom: "10px",
              }}
            >
              {this.state.data.subject}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "15px",

                color: "#ffffff",
                paddingBottom: "5px",
              }}
            >
              {/* todo:adding ratings */}
              <div className="flex items-center" style={{ fontSize: "21px" }}>
                <span className="">Ratings</span>
                <div className="flex items-center ml-2">
                  <svg
                    className="w-3 h-3 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-3 h-3 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-3 h-3 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-3 h-3 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              {/* react-text: 4993 */}Language: English{/* /react-text */}
            </div>
          </div>

          <div
            className="course-feed-img-box"
            style={{
              backgroundColor: "#fff",
              boxShadow:
                "0 0 1px 1px rgb(20 23 28 / 10%), 0 3px 1px 0 rgb(20 23 28 / 10%)",
              borderRadius: "4px",
              color: "#505763",
              padding: "15px",
              fontWeight: 650,
              fontFamily: "inherit",
              fontSize: "32px",
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="img-play-box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  "/api/getCourse/cover/" +
                  String(this.state.data.coverPicture).replace(/^.*[\\\/]/, "")
                }
                style={{ maxWidth: "335px" }}
              />
              <div className="play-circle">
                {/* react-text: 4998 */} {/* /react-text */}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="play-circle"
                  className="svg-inline--fa fa-play-circle fa-w-16 play-circle-icon"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
                  />
                </svg>
              </div>
            </div>

            <button
              className="back-home-button"
              style={{
                fontFamily: "inherit",
                color: "#fff",
                backgroundColor: "#ec5252",
                border: "1px solid transparent",
                display: "inline-block",
                margin: "25px 0px 18px 0px",
                textAlign: "center",
                verticalAlign: "middle",
                touchAction: "manipulation",
                cursor: "pointer",
                backgroundImage: "none",
                whiteSpace: "nowrap",
                padding: "12px 11px",
                fontSize: "15px",
                lineHeight: "1.35135",
                borderRadius: "2px",
                width: "90%",
                outline: "none",
              }}
            >
              Enroll Now
            </button>
          </div>
        </div>
        <div style={{ margin: "80px 80px 0px 80px" }}>
          <div
            className="learn-box"
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #dedfe0",
              padding: "30px 15px",
              minWidth: "300px",
            }}
          >
            <div
              className="learn-title"
              style={{
                fontSize: "22px",
                fontWeight: 600,
                margin: "0 0 10px",
                lineHeight: "1.43",
                color: "#29303b",
              }}
            >
              What you'll learn
            </div>
            <div>
              <div
                className="learn-text"
                style={{ fontSize: "14px", color: "#29303b", padding: "8px" }}
              >
                {this.state.data.description}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, porro quia incidunt corrupti necessitatibus sequi
                repellat eaque sint. Aut eveniet optio, distinctio magnam
                reprehenderit aspernatur. Nemo qui possimus earum quaerat.
              </div>
            </div>
          </div>
        </div>

        <CourseContentContainer content={this.state.content} />

        <QuizContainer content={this.state.content} quiz={this.state.quiz} />

        <ReadReviewContainer />

        <ReviewContainer />

        <RecomendedSection />

        <br />
        <br />
        <Footer />
      </>
    );
  }
}

export default CourseDetails;
