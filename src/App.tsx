import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCdmu2QhhMzXcXfixXnSIojR3ieYjBvPqs",
  authDomain: "soul-quiz-ec3f4.firebaseapp.com",
});

function App() {
  let [isSignedIn, setisSignedIn] = useState(false);
  // let isSignedIn = fals
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
    <div className="App">
      {isSignedIn ? (
        <div>
          <div> SignedIn</div>
          <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
          <h1>Welcome {firebase.auth().currentUser?.displayName}</h1>
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default App;
