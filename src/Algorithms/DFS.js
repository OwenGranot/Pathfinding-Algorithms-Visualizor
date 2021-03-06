var stop = false;

async function DFS_visit(board, startCell, endCell, changeCell, callback) {
  if (stop) return;

  const neighbors = startCell.neighbors();

  if (!neighbors || neighbors.length === 0) return;

  await neighbors.forEach(async (neighbor) => {
    const coords = neighbor.coords();
    const i = coords[0];
    const j = coords[1];
    const cell = board[i][j];
    neighbor.parent = startCell; // Set PI

    if (cell === 0) {
      changeCell(i, j, 2);
      await DFS_visit(board, neighbor, endCell, changeCell, callback);
    }
    if (cell === 3) {
      stop = true;
      callback && callback(neighbor);
      return;
    }
  });

  const coords = startCell.coords();
  const i = coords[0];
  const j = coords[1];
  if (board[i][j] === 2) {
    board[i][j] = 5;
    changeCell(i, j, 5);
  } // Traversed
}

export default function DFS(board, startCell, endCell, changeCell, callback) {
  stop = false;
  DFS_visit(board, startCell, endCell, changeCell, callback);
}
