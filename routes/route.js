const express = require("express")
const router = express.Router()
const board = []


function solveSudoku(board) {
    const n = board.length;
    dfs(board, n);
  }
  

  function dfs(board, n) {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (board[row][col] !== '.') continue;
        for (let i = 1; i <= 9; i++) {
          const c = i.toString();
          if (isValid(board, row, col, n, c)) {
            board[row][col] = c;
            if (dfs(board, n)) return true;
          }
        }
        board[row][col] = '.';
        return false;
      }
    }
    return true;
  }
  

  function isValid(board, row, col, n, c) {
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < n; i++) {
      if (board[row][i] === c || board[i][col] === c) return false;
      const curRow = blockRow +  Math.floor(i / 3);
      const curCol = blockCol +  Math.floor(i % 3);
      if (board[curRow][curCol] === c) return false;
    }
    return true;
  }





function checkValid(string){
    for(let i=0;i<=8;i++){
        const a=[];
        for(let j=0;j<=8;j++){
           a[j]=string.substr(0,1);
           if(string.length)
           string=string.substr(1);
        }
        board[i]=a;
    }

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const s = board[i][j];
            if(s === "1" || s === "2" || s === "3" || s === "4" || s === "5" || s === "6" || s === "7" || s === "8" || s === "9" || s === ".")
            continue;
            else
            return false
        }
    }
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            box = new Set();
    
        for (let j = 0; j < 9; j++) {
          let _row = board[i][j];
          let _col = board[j][i];
          let _box = board[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)]
          
          if (_row != '.') {
            if (row.has(_row)) return false;
            row.add(_row);
          }
          if (_col != '.') {
            if (col.has(_col)) return false;
            col.add(_col);
          }
          
          if (_box != '.') {
            if (box.has(_box)) return false;
            box.add(_box);
          } 
        }
      }
      return true
}



router.post('/', (req, res)=>{
     try{
         const sudoku = req.body.puzzle;
         const length = sudoku.length
         const solvable = checkValid(sudoku)
         if(length !== 81  || solvable === false){
          const final = {solvable : false, solution : '' }
          return res.send(final);
          }
         
         try{
             solveSudoku(board);
             solution =''

             for(let i=0;i<9;i++){
               for(let j=0;j<9;j++){
                 solution+=board[i][j]
               }
             }

             const final = {solvable : true, solution : solution }
             res.send(final);
        }
        catch(err){
          return res.status(400).json("Bad Input");
        }
     }
     catch (err) {
       console.log("error bahar")
        return res.status(400).json(err);
      }
 });



 module.exports = router