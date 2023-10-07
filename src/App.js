import React, { useState, useEffect, useRef } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import './App.css'
import Sidebar from "./Sidebar"
import logo from './Images/Copy_of_Tenzies-removebg-preview.png'


export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const intervalRef = useRef(null);
    const [countRolls, setCountRolls] = useState(0);


    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            setTimerOn(false);
            clearInterval(intervalRef.current);
        }
    }, [dice]);

    useEffect(() => {
        if (timerOn) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [timerOn]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        setCountRolls(prevCout => prevCout + 1);
        setTimerOn(true);
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCountRolls(0);
            setTime(0);
            setTimerOn(false);
            
        }
    }

    function holdDice(id) {
        setTimerOn(true);
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <>
            {tenzies && <Confetti />}
            <div id="flex-Container">
                <img alt="logo" className='logo' src={logo}/>
                <div id="content-container">
                    <div id="container">
                        <main>
                            <p className="instructions">Roll until all dice are the same.
                                Click each die to freeze it at its current value between rolls.</p>
                            <div className="dice-container">
                                {diceElements}
                            </div>
                            {tenzies ?
                                <button className="roll-dice"
                                    onClick={rollDice}>
                                    New Game
                                </button> :
                               
                                <button
                                    className="roll-dice"
                                    onClick={rollDice}
                                >
                                    Roll
                                </button>
                            }


                        </main>
                    </div>
                    <Sidebar time={time} rolls= {countRolls}/>
                </div>
            </div>
        </>
    )
}