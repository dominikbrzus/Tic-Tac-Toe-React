export const squares = [
  { id: 1, name: "top-left", clicked: false, player: null },
  { id: 2, name: "top", clicked: false, player: null },
  { id: 3, name: "top-right", clicked: false, player: null },
  { id: 4, name: "left", clicked: false, player: null },
  { id: 5, name: "middle", clicked: false, player: null },
  { id: 6, name: "right", clicked: false, player: null },
  { id: 7, name: "bottom-left", clicked: false, player: null },
  { id: 8, name: "bottom", clicked: false, player: null },
  { id: 9, name: "bottom-right", clicked: false, player: null },
];

export const winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
