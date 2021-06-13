import { createContext, useContext, useEffect, useState } from "react";
import "firebase/app";
import "firebase/firestore";
import firebase from "firebase";
import { InitialState } from "./leaderBoardContext.type";

const LeaderBoardContext = createContext<LeaderBoardContextType>(
  {} as LeaderBoardContextType
);

export default function useLeaderBoard() {
  return useContext(LeaderBoardContext);
}

type LeaderBoardContextType = {
  leaderboard: InitialState[];
  setleaderboard: React.Dispatch<React.SetStateAction<InitialState[]>>;
};

export const LeaderBoardProvider: React.FC = ({ children }) => {
  useEffect(() => {
    (async function () {
      try {
        const firebaseData = firebase.firestore().collection("leaderboard");
        const snapshot = await firebaseData.get();
        let newArray: any = [];
        snapshot.forEach((doc) => {
          newArray = [...newArray, doc.data()];
        });
        setleaderboard(newArray);
      } catch (error) {
        console.log("err", error.message);
      }
    })();
  }, []);

  const [leaderboard, setleaderboard] = useState<any>([]);

  return (
    <LeaderBoardContext.Provider value={{ leaderboard, setleaderboard }}>
      {children}
    </LeaderBoardContext.Provider>
  );
};
