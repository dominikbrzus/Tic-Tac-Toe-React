export interface TypingSquares {
  squares: {
    id: number;
    name: string;
    clicked: boolean;
    player: string | null;
  }[];
}

export interface ResultMatch {
  humanScore: number;
  computerScore: number;
  round: number;
}
