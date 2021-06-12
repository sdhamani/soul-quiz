import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useEffect, useState } from "react";
import "./homeScreen.css";
import { Link } from "react-router-dom";
import "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCdmu2QhhMzXcXfixXnSIojR3ieYjBvPqs",
  authDomain: "soul-quiz-ec3f4.firebaseapp.com",
  projectId: "soul-quiz-ec3f4",
  storageBucket: "soul-quiz-ec3f4.appspot.com",
  messagingSenderId: "10660779463",
  appId: "1:10660779463:web:24c3c5838d328c5b85f5e2",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

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
      setisSignedIn(!!user);
    });
  }, [isSignedIn]);

  return (
    <div className="homescreen">
      <div className="homescreen-content">
        <h1 className="homescreen-heading">Soul Quiz</h1>
        <div className="homescreen-login">
          {isSignedIn ? (
            <div className="homescreen-cateogory">
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
              {/* <button onClick={() => firebase.auth().signOut()}>
                Sign Out
              </button> */}
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
