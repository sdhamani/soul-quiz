import React from "react";
import useLeaderBoard from "../../contexts/leaderboardcontext/leaderBoardContext";
import "./leaderBoard.css";
import { Link } from "react-router-dom";
import {
  scores,
  InitialState,
} from "../../contexts/leaderboardcontext/leaderBoardContext.type";

function LeaderBoard() {
  const { leaderboard } = useLeaderBoard();

  const arrangeCateogory = leaderboard.map((item) => {
    const newArray: scores[] = item.scores.sort(function (a, b) {
      if (a.cateogory < b.cateogory) {
        return -1;
      }
      if (a.cateogory > b.cateogory) {
        return 1;
      }
      return 1;
    });
    return newArray;
  });

  console.log("arrangeCateogory", arrangeCateogory);

  // const sortedLeaderboardCateogory = leaderboard.sort(function (a, b) {
  //   if (a.scores.length > b.scores.length) {
  //     return -1;
  //   } else return 1;
  // });

  // const sortedLeaderboardScores = sortedLeaderboardCateogory.sort(function (
  //   a,
  //   b
  // ) {});

  // console.log("leaderboard", leaderboard);
  // console.log("sortedleaderboard", sortedLeaderboardCateogory);

  return (
    <div className="container">
      <div className="leaderboard">
        <div className="head">
          <i className="fas fa-crown"></i>
          <h1>Leaderboard</h1>
        </div>
        <div className="body">
          <ol>
            {leaderboard.map((user) => {
              return (
                <li key={user.userId} className="single-user">
                  <mark>{user.name.toUpperCase()}</mark>
                  {user.scores.map((score) => {
                    return (
                      <>
                        <ul key={score.cateogory}>
                          <li className="no-number">
                            {score.cateogory.toUpperCase()}
                          </li>
                          <li className="no-number">{score.score}</li>
                        </ul>
                      </>
                    );
                  })}
                </li>
              );
            })}
          </ol>
          <Link to="/">
            <button className="takemore-btn">Take More Quizzes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
