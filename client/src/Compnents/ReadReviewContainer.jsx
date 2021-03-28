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
            className="review-header"
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
          <div
            className="review-feed-container"
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
                KG
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                <div style={{ color: "rgb(104, 111, 122)" }}>a year ago</div>
                <div style={{ color: "rgb(41, 48, 59)", fontSize: "15px" }}>
                  Kyo Grey
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
              <div>I'm loving this!</div>
            </div>
          </div>
          <div
            className="review-feed-container"
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
                KG
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                <div style={{ color: "rgb(104, 111, 122)" }}>a year ago</div>
                <div style={{ color: "rgb(41, 48, 59)", fontSize: "15px" }}>
                  Kyo Grey
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
              <div>I'm loving this!</div>
            </div>
          </div>
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
            className="see-more-review-button"
            style={{
              color: "#007791",
              backgroundColor: "#fff",
              border: "1px solid #007791",
              fontWeight: 600,
              textAlign: "center",
              width: "140px",
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
