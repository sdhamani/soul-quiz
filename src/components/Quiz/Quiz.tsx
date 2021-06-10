import React, { useState } from "react";
import "./quiz.css";
import { questions } from "../../data/questions";
import { useParams } from "react-router";

function Quiz() {
  const [score, setScore] = useState(0);
  const [answeredClass, setansweredClass] = useState("");
  const [answeredOption, setansweredOption] = useState();
  const [questionNo, setQuestionNo] = useState(0);
  const { cateogory } = useParams();
  const filteredQuestions = questions.filter((question) => {
    return question.cateogory.toLowerCase() === cateogory.toLowerCase();
  });

  const answeredFun = (option: any) => {
    setansweredOption(option.target.value);
    if (
      filteredQuestions[questionNo].options[option.target.value - 1].isAnswer
    ) {
      setansweredClass("correct-answered");
      setScore((score) => score + 1);
    } else {
      setansweredClass("incorrect-answered");
    }

    setTimeout(() => {
      setQuestionNo(questionNo + 1);
      setansweredClass("");
    }, 1000);
  };

  return (
    <div className="quiz-div">
      <div className="container-fluid">
        <div className="modal-dialog">
          {questionNo <= filteredQuestions.length - 1 ? (
            <div className="modal-content">
              <div className="modal-header">
                <h3>
                  {" "}
                  <span className="question-numbers">
                    {" "}
                    {questionNo + 1} / {filteredQuestions.length}{" "}
                  </span>
                  Q. {filteredQuestions[questionNo].question}
                </h3>
              </div>
              <div className="modal-body">
                <div className="col-xs-3 5"> </div>
                <div className="quiz" id="quiz" data-toggle="buttons">
                  {" "}
                  <label
                    className={
                      answeredOption === "1"
                        ? "element-animation1 btn btn-lg btn-danger btn-block " +
                          answeredClass
                        : "element-animation1 btn btn-lg btn-danger btn-block "
                    }
                  >
                    <span className="btn-label">
                      <i className="glyphicon glyphicon-chevron-right"></i>
                    </span>
                    <input
                      onClick={(e) => answeredFun(e)}
                      type="radio"
                      name="q_answer"
                      value="1"
                    />
                    {filteredQuestions[questionNo].options[0].desc}
                  </label>
                  <label
                    className={
                      answeredOption === "2"
                        ? "element-animation1 btn btn-lg btn-danger btn-block " +
                          answeredClass
                        : "element-animation1 btn btn-lg btn-danger btn-block "
                    }
                  >
                    <span className="btn-label">
                      <i className="glyphicon glyphicon-chevron-right"></i>
                    </span>
                    <input
                      onClick={(e) => answeredFun(e)}
                      type="radio"
                      name="q_answer"
                      value="2"
                    />
                    {filteredQuestions[questionNo].options[1].desc}
                  </label>
                  {filteredQuestions[questionNo].options[2] && (
                    <label
                      className={
                        answeredOption === "3"
                          ? "element-animation1 btn btn-lg btn-danger btn-block " +
                            answeredClass
                          : "element-animation1 btn btn-lg btn-danger btn-block "
                      }
                    >
                      <span className="btn-label">
                        <i className="glyphicon glyphicon-chevron-right"></i>
                      </span>{" "}
                      <input
                        onClick={(e) => answeredFun(e)}
                        type="radio"
                        name="q_answer"
                        value="3"
                      />
                      {filteredQuestions[questionNo].options[2].desc}
                    </label>
                  )}{" "}
                  {filteredQuestions[questionNo].options[3] && (
                    <label
                      className={
                        answeredOption === "4"
                          ? "element-animation1 btn btn-lg btn-danger btn-block " +
                            answeredClass
                          : "element-animation1 btn btn-lg btn-danger btn-block "
                      }
                    >
                      <span className="btn-label">
                        <i className="glyphicon glyphicon-chevron-right"></i>
                      </span>{" "}
                      <input
                        onClick={(e) => answeredFun(e)}
                        type="radio"
                        name="q_answer"
                        value="4"
                      />{" "}
                      {filteredQuestions[questionNo].options[3].desc}{" "}
                    </label>
                  )}{" "}
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-content">Final score is {score}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
