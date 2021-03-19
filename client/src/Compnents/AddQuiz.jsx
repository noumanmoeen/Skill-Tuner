import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import auth_axios from "../utils/auth_axios";
class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      title: "",
      description: "",
      totalMarks: 0,
      questionText: "",
      questions: [],
      choices: [],
      correctAnswer: "",
      answerDescription: "",
      marks: 0,
      courseTitleDisable: false,
      courseSelected: false,
      tablevisible: false,
      A: "",
      B: "",
      C: "",
      D: "",
    };
  }
  async componentDidMount() {
    await auth_axios
      .get("/api/courses/getAllCourses")
      .then((res) => {
        this.setState({ course: res.data });
      })
      .catch((err) => {
        throw err;
      });
  }
  onSelectCourse = (e) => {
    this.setState({ courseId: e.target.value });
    if (e.target.value.length > 0) {
      this.setState({ courseSelected: true });
    } else {
      this.setState({ courseSelected: false });
    }
  };

  handleAddQuiz = (e) => {
    e.preventDefault();
    if (
      this.state.A.length == 0 ||
      this.state.B.length == 0 ||
      this.state.C.length == 0 ||
      this.state.D.length == 0 ||
      this.state.questionText.length == 0 ||
      this.state.title.length == 0 ||
      this.state.marks == 0 ||
      this.state.correctAnswer.length == 0
    ) {
      toast.error("Please fill all the fields to continue.");
    } else {
      // push all choices in array
      this.state.choices.push(this.state.A);
      this.state.choices.push(this.state.B);
      this.state.choices.push(this.state.C);
      this.state.choices.push(this.state.D);
      if (this.state.choices.includes(this.state.correctAnswer)) {
        this.setState({ totalMarks: this.state.totalMarks + this.state.marks });
        const question = {
          questionText: this.state.questionText,
          choices: this.state.choices,
          correctAnswer: this.state.correctAnswer,
          marks: this.state.marks,
        };
        this.state.questions.push(question);
        this.setState({
          A: "",
          B: "",
          C: "",
          D: "",
          questionText: "",
          choices: [],
          marks: 0,
          courseTitleDisable: true,
          tablevisible: true,
          correctAnswer: "",
        });
        toast.success(
          "Question added in the table don't forget to save table after after adding all questions"
        );
      } else {
        this.setState({ choices: [] });
        toast.error("your correct answer must be in given options");
      }
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
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <main
            className="justify-center flex-1 py-10 px-10"
            style={{ paddingBottom: "1rem" }}
          >
            <h1 className="text-3xl font-bold text-gray-600">Course</h1>
          </main>
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <main className="md:p-0  lg:px-8  ">
              <section className="bg-cream-lighter p-4 shadow">
                <div className="md:flex">
                  <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
                    Add Quiz in Course
                  </h2>
                </div>
                <form>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Select Course
                          </label>
                          {this.state.course.length > 0 ? (
                            <select
                              className="w-1/3 border bg-white rounded px-3 py-2 outline-none"
                              onChange={this.onSelectCourse}
                              disabled={this.state.courseSelected}
                            >
                              <option value="" disable selected>
                                Select course
                              </option>
                              {this.state.course.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    className="py-1"
                                    value={data._id}
                                  >
                                    {data.title}
                                  </option>
                                );
                              })}
                            </select>
                          ) : null}
                        </div>
                      </div>
                      {this.state.courseSelected == true ? (
                        <div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Quiz Title
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="title"
                                disabled={this.state.courseTitleDisable}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Quiz Title eg :quiz no 1"
                              />
                            </div>
                            <div className="md:flex-1 md:pl-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Question Marks
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="number"
                                name="marks"
                                value={this.state.marks}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="question Mark"
                              />
                            </div>
                          </div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Question Statement
                              </label>
                              <textarea
                                className="w-full shadow-inner p-2 border-0"
                                name="questionText"
                                value={this.state.questionText}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Write Question here."
                              />
                            </div>
                          </div>

                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Option A
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="A"
                                value={this.state.A}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="option A"
                              />
                            </div>
                            <div className="md:flex-1 md:pl-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Option B
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="B"
                                value={this.state.B}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Option B"
                              />
                            </div>
                          </div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Option C
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="C"
                                value={this.state.C}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Option C"
                              />
                            </div>
                            <div className="md:flex-1 md:pl-3">
                              <label className="block uppercase tracking-wide text-xs font-bold">
                                Option D
                              </label>
                              <input
                                className="w-full shadow-inner p-2 border-0"
                                type="text"
                                name="D"
                                value={this.state.D}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="Option D"
                              />
                            </div>
                          </div>
                          <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                                Correct Answer
                              </label>
                              <input
                                className="w-2\3 shadow-inner p-2 border-0"
                                type="text"
                                name="correctAnswer"
                                value={this.state.correctAnswer}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                placeholder="correct Answer"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => this.handleAddQuiz(e)}
                            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md  bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
                            add Question
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </form>
              </section>
              <br />
              {this.state.tablevisible ? (
                <>
                  <div className="md:flex">
                    <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
                      Added Questions in List
                    </h2>
                  </div>

                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                          #
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Question
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Option A
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Option B
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Option C
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Option D
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Correct option
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                          Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      {this.state.questions.map((data, key) => {
                        return (
                          <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                              <div class="flex items-center">
                                <div>
                                  <div class="text-sm leading-5 text-gray-800">
                                    {key}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                              <div class="text-sm leading-5 text-blue-900">
                                {data.questionText}
                              </div>
                            </td>
                            {data.choices.map((value, k) => {
                              return (
                                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                  {value}
                                </td>
                              );
                            })}

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                              <div class="text-sm leading-5 text-blue-900">
                                {data.correctAnswer}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                              <div class="text-sm leading-5 text-blue-900">
                                {data.marks}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              ) : null}
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default AddQuiz;
