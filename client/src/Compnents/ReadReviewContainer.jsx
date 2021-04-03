import React, { Component } from "react";

class ReadReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>
          <div
            className=""
            style={{
              padding: "70px 130px 0px 130px",
              marginBottom: "22px",
              marginTop: "4px",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "1.43",
              color: "#29303b",
              textAlign: "center",
            }}
          >
            Reviews
          </div>
        </div>
        <div
          className="review"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0px 130px",
          }}
        >
          {this.props.feedback.length > 0
            ? this.props.feedback.slice(0, 5).map((data) => {
                return (
                  <div
                    className="w-full"
                    style={{
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      borderTop: "solid 1px #dedfe0",
                      color: "#29303b",
                      fontSize: "15px",
                      padding: "35px",
                    }}
                  >
                    <div
                      className="review-user-info"
                      style={{ display: "flex", width: "170px" }}
                    >
                      <div
                        className="initial-review"
                        style={{
                          backgroundColor: "#00576b",
                          minWidth: "46px",
                          height: "46px",
                          borderRadius: "50%",
                          border: "1px solid #fff",
                          color: "#fff",
                          fontSize: "15px",
                          textAlign: "center",
                          lineHeight: "46px",
                        }}
                      >
                        {data.userId.firstname[0]}
                        {data.userId.lastname[0]}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "15px",
                        }}
                      >
                        <div className="flex items-center">
                          <svg
                            className={`w-3 h-3 fill-current ${
                              data.ratings >= 1
                                ? "text-yellow-600"
                                : "text-gray-400"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <svg
                            className={`w-3 h-3 fill-current ${
                              data.ratings >= 2
                                ? "text-yellow-600"
                                : "text-gray-400"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <svg
                            className={`w-3 h-3 fill-current ${
                              data.ratings >= 3
                                ? "text-yellow-600"
                                : "text-gray-400"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <svg
                            className={`w-3 h-3 fill-current ${
                              data.ratings >= 4
                                ? "text-yellow-600"
                                : "text-gray-400"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <svg
                            className={`w-3 h-3 fill-current ${
                              data.ratings >= 5
                                ? "text-yellow-600"
                                : "text-gray-400"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        </div>
                        <div style={{ color: "rgb(104, 111, 122)" }}>
                          a month ago
                        </div>
                        <div
                          style={{ color: "rgb(41, 48, 59)", fontSize: "15px" }}
                        >
                          {`${data.userId.firstname}  ${data.userId.lastname}`}
                        </div>
                      </div>
                    </div>
                    <div
                      className="review-text"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "600px",
                        paddingLeft: "60px",
                      }}
                    >
                      <div
                        className="index-card-ratting-feed"
                        style={{
                          display: "flex",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#ffffff",
                          paddingBottom: "5px",
                          marginLeft: "-10px",
                        }}
                      ></div>
                      <div>{data.comment}</div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div
          className="see-more-b-box"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              color: "#007791",
              backgroundColor: "#fff",
              border: "1px solid #007791",
              fontWeight: 600,
              textAlign: "center",
              width: "200px",
              padding: "11px 12px",
            }}
          >
            See more reviews
          </div>
        </div>
      </>
    );
  }
}

export default ReadReviewContainer;
