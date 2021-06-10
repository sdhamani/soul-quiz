import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useEffect, useState } from "react";
import "./homeScreen.css";
import { Link } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyCdmu2QhhMzXcXfixXnSIojR3ieYjBvPqs",
  authDomain: "soul-quiz-ec3f4.firebaseapp.com",
});

function HomeScreen() {
  let [isSignedIn, setisSignedIn] = useState(false);

  let uiConfig: any = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,

      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log({ user });
      setisSignedIn(!!user);
      console.log(isSignedIn);
    });
  }, [isSignedIn]);

  return (
    <div className="homescreen">
      <div className="homescreen-content">
        <h1 className="homescreen-heading">Soul Quiz</h1>
        <div className="homescreen-login">
          {isSignedIn ? (
            <div className="homescreen-cateogory">
              {/* <div> SignedIn</div>
              <button onClick={() => firebase.auth().signOut()}>
                Sign Out
              </button> */}
              <Link className="cateogory-link" to="/quiz/general">
                <button
                  type="button"
                  className="btn btn-primary quiz-cateogory"
                >
                  General
                </button>{" "}
              </Link>{" "}
              <Link className="cateogory-link" to="/quiz/gym">
                <button
                  type="button"
                  className="btn btn-primary quiz-cateogory"
                >
                  Gym
                </button>
              </Link>{" "}
              <Link className="cateogory-link" to="/quiz/yoga">
                <button
                  type="button"
                  className="btn btn-primary quiz-cateogory"
                >
                  Yoga
                </button>{" "}
              </Link>
              <Link className="cateogory-link" to="/quiz/aerobics">
                <button
                  type="button"
                  className="btn btn-primary quiz-cateogory"
                >
                  Aerobics
                </button>{" "}
              </Link>
            </div>
          ) : (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
