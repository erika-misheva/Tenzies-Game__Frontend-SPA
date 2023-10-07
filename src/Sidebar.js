import { GiSandsOfTime } from 'react-icons/gi';
import { BsArrowRepeat } from 'react-icons/bs';
import { GiTrophyCup } from 'react-icons/gi';

export default function Sidebar(props) {
    const time = props.time;
    const minutes = Math.floor(time / 60000);
const seconds = Math.floor((time / 1000) % 60);
const totalSeconds = minutes * 60 + seconds;
    const place = (totalSeconds) => {
        if (seconds < 10) {
          return 'First place: TENZI Master!';
        } else if (seconds >= 10 && seconds <= 20) {
          return 'Second place: Dice Dragon!';
        } else if (seconds > 20 && seconds <= 30) {
          return "Third place : Rockin' Roller";
        }
        else if (seconds > 30 && seconds <= 40) {
            return "Fourth place : Tumbler in Training";
          }
        else{
            return "Last place: Cubie Newbie"
        }  
      };


    return (
        <div className="side-bar">
            <div className='timer'> 
                <span>{("0" + Math.floor(time / 60000 % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor(time / 1000 % 60)).slice(-2)}:</span>
                <span>{("0" + time / 10 % 100).slice(-2)}</span>
            </div>

            <h2>Your scores:</h2>
            <div className="scoreCard">
                <p>How fast were you? </p>
                <span>{totalSeconds} seconds</span>
                <GiSandsOfTime size={50} color="blue" />
            </div>
            <div className="scoreCard">
                <p>Rolls :</p>
                <span>{props.rolls}</span>
                <BsArrowRepeat size={50} color="blue" />
            </div>
            <div className="scoreCard">
                <p id="dynamicStreakDays">Place: </p>
                <span>{place(totalSeconds)}</span>
                <GiTrophyCup size={50} color="gold" />
            </div>
        </div>
    )
}