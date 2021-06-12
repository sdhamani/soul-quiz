import React from "react";
import useLeaderBoard from "../../contexts/leaderboardcontext/leaderBoardContext";
import "./leaderBoard.css";
import { Link } from "react-router-dom";

function LeaderBoard() {
  const { leaderboard } = useLeaderBoard();

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
                <li>
                  <mark>{user.name.toUpperCase()}</mark>
                  {user.scores.map((score) => {
                    return (
                      <>
                        <span>{score.cateogory.toUpperCase()}:</span>
                        <span>{score.score},</span>
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
