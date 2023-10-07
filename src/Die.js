import React from "react"
import Dot from "./Dot";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]

    };
    const numberOfDots = props.value;
    const dotsArray = [];

    for (let i = 0; i < numberOfDots; i++) {
        const [top, left] = dotPositionMatrix[numberOfDots][i];
        dotsArray.push(
            <Dot
                key={i}
                style={{
                    position:'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    backgroundColor: 'black',
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    transform: `translateX(-${left}%) translateY(-${top}%)`

                }
                }
            />
        );
    }

    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            {dotsArray}
        </div>
    )
}