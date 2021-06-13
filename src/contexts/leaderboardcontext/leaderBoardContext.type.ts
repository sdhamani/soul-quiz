export type scores = {
  cateogory: string;
  score: number;
};

export type InitialState = {
  userId: string;
  name: string;
  scores: scores[];
};
