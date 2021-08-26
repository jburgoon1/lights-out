import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=0.25}) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let y = 0; y < nrows; y++){
      let row = [];
      for(let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    
    setBoard(oldBoard => {
      let [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(rows => [...rows]);

      

      // TODO: in the copy, flip this cell and the cells around it
    flipCell(y, x, newBoard);
    flipCell(y, x - 1, newBoard);
    flipCell(y, x + 1, newBoard);
    flipCell(y - 1, x, newBoard);
    flipCell(y + 1, x, newBoard);  
      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  
if(hasWon()){
  return <h1>YOU DID IT</h1>
}
  // make table board

  // TODO

  let tblBoard = [];
  for(let y = 0; y < nrows; y++){
    let row = [];
    for(let x = 0; x < ncols; x++){
      let c = `${y}-${x}`;
      row.push(<Cell
          key={c}
          isLit={board[y][x]} 
          flipCellsAroundMe={() => flipCellsAround(c)}
      />)
    }
    tblBoard.push(<tr key={y}>{row}</tr>)
  }

  return(
    <div>
      <div className='Board-title'>        
        <div>Lights</div>
        <div>Out</div>
      </div>
      <table className='Board'>
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    </div>
    
  )
  
}

export default Board;
