export type InitialState = [
  {
    name: string;
    emailId: string;
    scores: [
      {
        cateogory: string;
        score: number;
      }
    ];
  }
];

export type LeaderBoardContextType = {
  leaderBoardState: InitialState;
  leaderboardDispatch: "";
};
