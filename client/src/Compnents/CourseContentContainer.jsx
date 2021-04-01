import React, { Component } from "react";
import { toast } from "react-toastify";

class CourseContentContainer extends Component {
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
            Course content
          </div>
        </div>
        <div
          className="accordion "
          style={{
            margin: "40px 78px 23px ",
            color: "#29303b",
          }}
        >
          {this.props.content.length > 0
            ? this.props.content.map((data, index) => {
                return (
                  <div className="w-full">
                    <input
                      type="checkbox"
                      name="panel"
                      id={`panel-${index}`}
                      className="hidden"
                      disabled={
                        this.props.completedLectures >= index + 1 ? false : true
                      }
                    />

                    <label
                      htmlFor={`panel-${index}`}
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
                        {data.lectureNo}
                      </h2>
                      <h6 className="p-3 font-medium">Learning Objective:</h6>
                      <p
                        className="accordion__body "
                        style={{ paddingTop: 0, paddingLeft: 25 }}
                        id="panel1"
                      >
                        {data.learningObjective}
                      </p>

                      <h6 className="p-3 font-medium">
                        Lecture Type: {data.type}
                      </h6>

                      <h6 className="p-3 font-medium">Description:</h6>
                      <p
                        className="accordion__body "
                        style={{ paddingTop: 0, paddingLeft: 25 }}
                        id="panel1"
                      >
                        {data.description}
                      </p>
                      <h6 className="p-3 font-medium">Resources:</h6>
                      <p
                        className="accordion__body "
                        style={{ paddingTop: 0, paddingLeft: 25 }}
                        id="panel1"
                      >
                        {data.resources === "" ? (
                          <>{data.resources}</>
                        ) : (
                          <>No resourses are available</>
                        )}
                      </p>
                      <h6 className="p-3 font-medium">Video:</h6>
                      <iframe
                        className="p-3"
                        width={700}
                        height={400}
                        src={data.url}
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {index + 1 === this.props.completedLectures ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-200"
                          onClick={this.props.handleCompleteLecture}
                          style={{
                            fontSize: "15px",
                            padding: "12px 54px",
                            marginLeft: 20,
                          }}
                        >
                          {this.props.completeLoading ? (
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
                          Press if you completed this lecture to unlock Another
                        </button>
                      ) : null}

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

export default CourseContentContainer;
