import React from 'react';
import { useState } from 'react';
import Cell from './components/Cell';
import './App.css';

function App() {
  const startField = {
    '[0, 0]': '',
    '[0, 1]': '',
    '[0, 2]': '',
    '[1, 0]': '',
    '[1, 1]': '',
    '[1, 2]': '',
    '[2, 0]': '',
    '[2, 1]': '',
    '[2, 2]': '',
  }

  const rows = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
  const moves = [1, 2, 3, 4]
  const [startCoordinates, setStart] = useState([getCoordinates(0, 3), getCoordinates(0, 3)]);
  const [coordinatesOfMoves, setCoordinatesOfMoves] = useState(getCoordinatesOfMoves(startCoordinates, [1, 2, 3, 4]))
  const [field, setField] = useState(getFieldWhithStart(startField, coordinatesOfMoves))

  function getFieldWhithStart(field, coordinatesOfMoves) {
    let resultField = {};
    for (let key in field) {
      resultField[key] = field[key];
    }
    resultField[`[${coordinatesOfMoves[0][0]}, ${coordinatesOfMoves[0][1]}]`] = 'Start';
    return resultField;
  }

  function getNearbyPosition(position) {
    let newPosition = position;
    while (newPosition === position) {
      if (position === 0) {
        newPosition = 1;
      } else
        if (position === 2) {
          newPosition = position - 1;
        } else
          newPosition = getCoordinates(0, 3);
    }
    return newPosition;
  }

  function getNearbyCoordinates(currentCorrdinates) {
    const randomBoolean = Math.random() < 0.5;
    let newCorrdinates = currentCorrdinates;

    newCorrdinates = [randomBoolean ? currentCorrdinates[0] : getNearbyPosition(currentCorrdinates[0]),
    randomBoolean ? getNearbyPosition(currentCorrdinates[1]) : currentCorrdinates[1]]
    return newCorrdinates;
  }

  function getCoordinatesOfMoves(startCoordinates, moves) {
    let currentCorrdinates = startCoordinates;
    const coordinatesOfMoves = [currentCorrdinates];
    for (let i = 0; i < moves.length; i++) {
      currentCorrdinates = getNearbyCoordinates(currentCorrdinates);
      coordinatesOfMoves.push(currentCorrdinates)
    }
    return coordinatesOfMoves;
  }

  function getCoordinates(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getDirection(coordinatesOfMoves, step) {
    if (coordinatesOfMoves[step][1] < coordinatesOfMoves[step - 1][1]) return 'up';
    if (coordinatesOfMoves[step][0] > coordinatesOfMoves[step - 1][0]) return 'right';
    if (coordinatesOfMoves[step][1] > coordinatesOfMoves[step - 1][1]) return 'down';
    if (coordinatesOfMoves[step][0] < coordinatesOfMoves[step - 1][0]) return 'left';
    return `${coordinatesOfMoves[step][0]} <> ${coordinatesOfMoves[step - 1][0]}`
  }

  function restart() {
    setStart([getCoordinates(0, 3), getCoordinates(0, 3)]);
    const newcoordinatesOfMoves = getCoordinatesOfMoves(startCoordinates, [1, 2, 3, 4])
    setCoordinatesOfMoves(newcoordinatesOfMoves);
    setField(getFieldWhithStart(startField, newcoordinatesOfMoves))
  }

  return (
    <div className='App'>
      <div className='field' >
        {rows.map((row, indexRow) => (
          <div key={indexRow} className='row'>
            {row.map((indexColumn) => (
              <Cell key={indexColumn} indexColumn={indexColumn} indexRow={indexRow} coordinatesOfMoves={coordinatesOfMoves} field={field} setField={setField} />
            ))}
          </div>
        ))}
      </div>
      <div className='moves'>
        {moves.map((step) => (
          <div key={step} className='move'>
            {getDirection(coordinatesOfMoves, step)}
          </div>))
        }
      </div>
      <button className='restart' onClick={restart}>Restart</button>
    </div>
  )
}

export default App;