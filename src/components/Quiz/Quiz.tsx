import React, { useState } from "react";
import "./quiz.css";
import { questions } from "../../data/questions";
import { useNavigate, useParams } from "react-router";
import firebase from "firebase";
import useLeaderBoard from "../../contexts/leaderboardcontext/leaderBoardContext";
import {
  scores,
  InitialState,
} from "../../contexts/leaderboardcontext/leaderBoardContext.type";

function Quiz() {
  const [score, setScore] = useState(0);

  const [classOption0, setclassOption0] = useState("");
  const [classOption1, setclassOption1] = useState("");
  const [classOption2, setclassOption2] = useState("");
  const [classOption3, setclassOption3] = useState("");
  const [questionNo, setQuestionNo] = useState(0);
  const { cateogory } = useParams();
  const { leaderboard, setleaderboard } = useLeaderBoard();
  const navigate = useNavigate();

  const filteredQuestions = questions.filter((question) => {
    return question.cateogory.toLowerCase() === cateogory.toLowerCase();
  });

  const updateLeaderBoard = async () => {
    const loggedInUserId = firebase.auth().currentUser?.uid;
    const userScore: InitialState | undefined = leaderboard.find(
      (item) => item.userId === loggedInUserId
    );
    const userScores = userScore?.scores;
    const userScorefitered: scores[] | undefined = userScores?.filter(
      (item: scores) => item.cateogory !== cateogory
    );
    let obj: InitialState;

    if (userScorefitered === undefined) {
      obj = {
        userId: String(loggedInUserId),
        name: String(firebase.auth().currentUser?.displayName),
        scores: [
          {
            cateogory: cateogory,
            score: score + 1,
          },
        ],
      };
    } else {
      obj = {
        userId: String(loggedInUserId),
        name: String(firebase.auth().currentUser?.displayName),
        scores: [
          ...userScorefitered,
          {
            cateogory: cateogory,
            score: score + 1,
          },
        ],
      };
    }

    const newleaderboard = leaderboard.map((item) => {
      if (item.userId === loggedInUserId) {
        return { ...item, scores: obj.scores };
      }
      return item;
    });
    setleaderboard(newleaderboard);
    try {
      const database = firebase
        .firestore()
        .collection("leaderboard")
        .doc(String(loggedInUserId));
      await database.set(obj);
    } catch (error) {
      console.log("error in saving data", error);
    }
  };

  const answeredFun = (option: any) => {
    console.log(option.target.value);

    const correctAnswer = filteredQuestions[questionNo].options.findIndex(
      (option) => option.isAnswer === true
    );
    const correctClass = "setclassOption" + correctAnswer;
    const userClickedClass = "setclassOption" + (option.target.value - 1);
    console.log({ correctClass }, { userClickedClass });
    if (
      filteredQuestions[questionNo].options[option.target.value - 1].isAnswer
    ) {
      eval(userClickedClass)("correct-answered");
      setScore((score) => score + 1);
    } else {
      eval(userClickedClass)("incorrect-answered");
      eval(correctClass)("correct-answered");
    }

    setTimeout(() => {
      setQuestionNo(questionNo + 1);
      eval(userClickedClass)("");
      eval(correctClass)("");
    }, 1300);

    if (questionNo >= filteredQuestions.length - 1) {
      updateLeaderBoard();
      navigate("/leaderboard");
    }
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
                  {filteredQuestions[questionNo].question}
                </h3>
              </div>
              <div className="modal-body">
                <div className="col-xs-3 5"> </div>
                <div className="quiz" id="quiz" data-toggle="buttons">
                  {" "}
                  <label
                    className={
                      "element-animation1 btn btn-lg btn-danger btn-block " +
                      classOption0
                    }
                  >
                    <span className="btn-label">
                      <i className="glyphicon glyphicon-chevron-right"></i>
                    </span>
                    <input
                      className="radio"
                      onClick={(e) => answeredFun(e)}
                      type="radio"
                      name="q_answer"
                      value="1"
                    />
                    {filteredQuestions[questionNo].options[0].desc}
                  </label>
                  <label
                    className={
                      "element-animation1 btn btn-lg btn-danger btn-block " +
                      classOption1
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
                        "element-animation1 btn btn-lg btn-danger btn-block " +
                        classOption2
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
                        "element-animation1 btn btn-lg btn-danger btn-block " +
                        classOption3
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
            <div>
              <div className="modal-content">Final score is {score}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
