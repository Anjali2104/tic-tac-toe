import { useState } from "react";
import Card from "../Card/Card";
import { ToastContainer, toast } from "react-toastify";
import isWinner from '../../helpers/checkWinner';
import './Grid.css'

import 'react-toastify/dist/ReactToastify.css'

function Grid({numberOfCards}){
    const [turn, setTurn] = useState(true);
    const [board ,setBoard]= useState(Array(numberOfCards).fill(""));
    const [winner, setWinner] = useState(null);
    function play(index){
        console.log("moved played",index);
        if(turn == true){
            board[index]="O"
        }
        else{
            board[index] = "X"
        }
        const win= isWinner(board,turn? "O":"X")
        if(win){
          setWinner(win)
          toast.success(`Congratulations ${win} wins the game!!`)
        }
        setBoard([...board])
        setTurn(!turn);

    }
    function reset(){
        setBoard(Array(numberOfCards).fill(""))
        setWinner(null)
        setTurn(true)
    }
    return (
    
    <div className="grid-wrapper">
        {winner && (
          <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>Reset Game</button>
           <ToastContainer position="top-center"/>
          </>
         )}
         <h1 className="turn-highlight">Current Turn: {(turn) ? 'O' : 'X'} </h1>
        <div className="grid">
           {board.map((value,idx) => {
           return <Card  gameEnd = {winner ? true: false} onPlay={play} player={value} key={idx}  index={idx}/>
           })}
        </div>
    </div>
      
   
     
    
    
    )
}
export default Grid;