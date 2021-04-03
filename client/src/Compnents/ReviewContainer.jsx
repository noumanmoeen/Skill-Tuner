import React, { Component } from "react";
import { toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      ratings: 0,
      loading: false,
    };
  }

  handleAddReview = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.comment.length === 0 || this.state.ratings === 0) {
      toast.error("please write comment and select ratings to make a review");
      this.setState({ loading: false });
    } else {
      await auth_axios
        .post("/api/courses/addFeedback", {
          course_id: this.props.courseId,
          user_id: this.props._id,
          comment: this.state.comment,
          ratings: this.state.ratings,
        })
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              toast.success("review is added successfully");
              this.setState({ loading: false });
              window.location.reload();
            }, 1200);
          } else {
            this.setState({ loading: false });
            toast.error("there is an error in posting your review");
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
            });
          }
          throw err;
        });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
            name="comment"
            onChange={(e) => this.handleChange(e)}
            style={{
              width: "600px",
              resize: "none",
              height: "200px",
              marginBottom: "30px",
              border: "1px solid black",
            }}
          />

          <select
            name="ratings"
            style={{ marginBottom: "20px" }}
            onChange={(e) => this.handleChange(e)}
          >
            <option value="0">Select Ratings</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {this.props.id ? (
            <>
              {this.props._id}

              <button
                className="bg-blue-500 hover:bg-blue-200"
                onClick={(e) => this.handleAddReview(e)}
                style={{ fontSize: "15px", padding: "12px 54px" }}
              >
                {this.state.loading ? (
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : null}
                Make Review
              </button>
            </>
          ) : (
            <h5 style={{ color: "red" }}>Please login to give review</h5>
          )}
        </div>
        <br />
        <br />
      </>
    );
  }
}

export default ReviewContainer;
