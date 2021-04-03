import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import auth_axios from "../utils/auth_axios";
import Footer from "./Footer";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null, //current users answer
      currentIndex: 0, //current questions index
      options: [], //the four options
      quizEnd: false, //True if it's the last question
      score: 0, //the Score
      disabled: true, // disables before selecting one answer
      QuizData: [],
      questionPoint: 0,
    };
  }

  async componentDidMount() {
    await auth_axios
      .get(
        `/api/courses/Quiz/${this.props.match.params.id}/${this.props.match.params.courseId}`
      )
      .then((res) => {
        this.setState({ QuizData: res.data.quiz[0].questions });
      });
    this.loadQuiz();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state; // updated after click currentIndex
    if (this.state.currentIndex !== prevState.currentIndex) {
      // if true loading new q
      if (this.state.QuizData.length > 0) {
        this.setState(() => {
          return {
            disabled: true,
            question: this.state.QuizData[currentIndex].questionText,
            options: this.state.QuizData[currentIndex].choices,
            answer: this.state.QuizData[currentIndex].correctAnswer,
            questionPoint: this.state.QuizData[currentIndex].marks,
          };
        });
      }
    }
  } // In this case, if the current index changes,
  // then we have to set the question and also disable the options so that user
  // would not be able to select another option.

  loadQuiz = () => {
    const { currentIndex } = this.state;
    if (this.state.QuizData.length > 0) {
      this.setState(() => {
        return {
          question: this.state.QuizData[currentIndex].questionText,
          options: this.state.QuizData[currentIndex].choices,
          answer: this.state.QuizData[currentIndex].correctAnswer,
          questionPoint: this.state.QuizData[currentIndex].marks,
        };
      });
    }
  }; // This function simply sets a question based on the current index

  //Handles Click event for the next button
  nextQuestionHandler = () => {
    const { userAnswer, answer, score, questionPoint } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + questionPoint,
      });
    } //Check for correct answer and increment score

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  }; // Sets the userAnswer state to the option selected by the user and enables next step

  //Responds to the click of the finish button
  finishHandler = async () => {
    if (this.state.userAnswer === this.state.answer) {
      await this.setState({
        score: this.state.score + this.state.questionPoint,
      });
    } //Check for Last answers
    if (this.state.currentIndex === this.state.QuizData.length - 1) {
      await auth_axios
        .post("/api/users/AddQuizMarks", {
          _id: localStorage.getItem("user_id"),
          courseId: this.props.match.params.courseId,
          marks: this.state.score,
        })
        .then((res) => {
          if (res.status == 200) {
            setTimeout(() => {
              toast.success("your marks are recorded for leader board");
              this.props.history.push(
                `/Courses/${this.props.match.params.courseId}/details`
              );
            }, 1200);
          } else {
            toast.error("marks are not recorded in server");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;
    if (this.state.QuizData.length > 0) {
      //get the current state
      if (quizEnd) {
        return (
          <>
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
            <section
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                height: 400,
              }}
              className="d-flex align-items-center dark-overlay bg-cover"
            >
              <div className="container py-6 py-lg-7 text-white overlay-content text-center">
                <div className="row">
                  <div className="col-xl-10 mx-auto">
                    <h3 className="display-5 font-weight-bold text-shadow">
                      Quiz
                    </h3>
                    <p className="text-lg text-shadow  ">
                      Please Answer the given questions to gain points.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="flex justify-center bg-gray-100">
              <h1 style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                Quiz Over. Final score is {this.state.score} points
              </h1>
            </div>

            <Footer />
          </>
        );
      }
      return (
        <>
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
          <section
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
              height: 400,
            }}
            className="d-flex align-items-center dark-overlay bg-cover"
          >
            <div className="container py-6 py-lg-7 text-white overlay-content text-center">
              <div className="row">
                <div className="col-xl-10 mx-auto">
                  <h3 className="display-5 font-weight-bold text-shadow">
                    Quiz
                  </h3>
                  <p className="text-lg text-shadow  ">
                    Please Answer the given questions to gain points.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex justify-center bg-gray-100">
            <div>
              <br />
              <br />
              <br />
              <h2>{question}</h2>
              <span>{`Question ${currentIndex + 1} of ${
                this.state.QuizData.length
              }`}</span>
              {options.map((
                option,
                index //for each option, new paragraph
              ) => (
                <p
                  key={index}
                  className={`options ${
                    userAnswer === option ? "selected" : null
                  }`}
                  onClick={() => this.checkAnswer(option)}
                >
                  {option}
                </p>
              ))}
              {currentIndex < this.state.QuizData.length - 1 && (
                // Next button only displays if the above is true
                <button
                  className="ui inverted button"
                  disabled={this.state.disabled}
                  onClick={this.nextQuestionHandler}
                >
                  Next Question
                </button>
              )}
              {currentIndex === this.state.QuizData.length - 1 && (
                <button
                  className="ui inverted button"
                  disabled={this.state.disabled}
                  onClick={this.finishHandler}
                >
                  Finish
                </button>
              )}
              <br />
              <br />
              <br />
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
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
          <section
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
              height: 400,
            }}
            className="d-flex align-items-center dark-overlay bg-cover"
          >
            <div className="container py-6 py-lg-7 text-white overlay-content text-center">
              <div className="row">
                <div className="col-xl-10 mx-auto">
                  <h3 className="display-5 font-weight-bold text-shadow">
                    Quiz
                  </h3>
                  <p className="text-lg text-shadow  ">
                    Please Answer the given questions to gain points.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex justify-center bg-gray-100">
            <br />
            <br />
            <h1 style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              Ops no Questions Found!!!!
            </h1>
            <br />
            <br />
          </div>

          <Footer />
        </>
      );
    }
  }
}

export default Quiz;
