import React from "react"

export default function Cell({ field, indexColumn, indexRow, coordinatesOfMoves, setField }) {
    function getFieldWhithResult(field, coordinatesOfMoves) {
        let resultField = {};
        for (let key in field) {
            resultField[key] = field[key];
        }
        resultField[`[${coordinatesOfMoves[coordinatesOfMoves.length - 1][0]}, ${coordinatesOfMoves[coordinatesOfMoves.length - 1][1]}]`] = 'right';
        return resultField;
    }

    function getFieldWhithResultRong(field, coordinatesOfMoves) {
        let resultField = {};
        for (let key in field) {
            resultField[key] = field[key];
        }
        resultField[`[${indexColumn}, ${indexRow}]`] = 'rong';
        resultField[`[${coordinatesOfMoves[coordinatesOfMoves.length - 1][0]}, ${coordinatesOfMoves[coordinatesOfMoves.length - 1][1]}]`] = 'this right';
        return resultField;
    }

    function isCoordinatesEqual(startCoordinates, cellCoordinates) {
        return cellCoordinates.every((v, i) => v === startCoordinates[i])
    }

    function handleClick() {
        const elemCoordinates = [indexColumn, indexRow];
        const finishCoordinates = coordinatesOfMoves[coordinatesOfMoves.length - 1];

        if (isCoordinatesEqual(elemCoordinates, finishCoordinates)) {
            setField(getFieldWhithResult(field, coordinatesOfMoves));

        } else {
            setField(getFieldWhithResultRong(field, coordinatesOfMoves));
        }
    }

    return (
        <div key={indexColumn} onClick={handleClick} className='cell' x={indexColumn} y={indexRow}>
            {field[`[${indexColumn}, ${indexRow}]`]}
        </div>
    )
}