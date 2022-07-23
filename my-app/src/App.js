import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

//1. есть координаты старта
//2. 1. нужно направление движения
//   2. направление движения должно учитывать края.
//или получаемкоординаты соседнего поля хода, из него выясняем куда движение происходит! - так лучше
//нужна функция хода(положение), т.е. изменяем одну из координат: функция выбора по Х или У, 
//далее проверка: 1. не должно совпадать с нынешним положением иначе заново
//не должно выходить за пределы поля - нужны ограничения

//функция хода(координаты были, новые координаты):

//state положения, нет не state а переменная функции вычисления финиша
//но нужен state ходов: массив координат, из которого будем вырисовывать ходы в moves

function App() {

  const rows = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
  const [startCoordinates, setStart] = useState([getCoordinates(0, 3), getCoordinates(0, 3)]);
  //const startCoordinates = [getCoordinates(0, 3), getCoordinates(0, 3)];
  const moves = [1, 2, 3, 4]

  const [coordinatesOfMoves, setCoordinatesOfMoves] = useState(getCoordinatesOfMoves(startCoordinates, [1, 2, 3, 4]))

  function getNearbyPosition(position) {
    let newPosition = position;
    while (newPosition == position) {
      if (position == 0) {
        newPosition = 1;
      } else
        if (position == 2) {
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

    console.log(coordinatesOfMoves);
    return coordinatesOfMoves;
  }

  function getCoordinates(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function isStart(startCoordinates, cellCoordinates) {
    return cellCoordinates.every((v, i) => v === startCoordinates[i])
  }

  function getDirection(coordinatesOfMoves, step) {
    if (coordinatesOfMoves[step][1] < coordinatesOfMoves[step - 1][1]) return 'up';
    if (coordinatesOfMoves[step][0] > coordinatesOfMoves[step - 1][0]) return 'right';
    if (coordinatesOfMoves[step][1] > coordinatesOfMoves[step - 1][1]) return 'down';
    if (coordinatesOfMoves[step][0] < coordinatesOfMoves[step - 1][0]) return 'left';
    return `${coordinatesOfMoves[step][0]} <> ${coordinatesOfMoves[step - 1][0]}`
  }

  console.log();

  return (
    <div className='App'>
      <div className='field'>
        {rows.map((row, indexRow) => (
          <div key={indexRow} className='row'>
            {row.map((column, indexColumn) => (
              <div key={indexColumn} className='cell' x={indexColumn} y={indexRow}>
                {`${isStart(startCoordinates, [indexColumn, indexRow]) ? 'start' : [indexColumn, indexRow]}`}
              </div>
            ))}
          </div>
        ))}
      </div>
      {coordinatesOfMoves[0]}
      <div className='moves'>
        {moves.map((step) => (
          <div key={step} className='move'>
            {coordinatesOfMoves[step]} =
            {getDirection(coordinatesOfMoves, step)}
          </div>))
        }
      </div>
    </div>
  )
}

export default App;

/*
function App() {
  const [squares, setData] = useState(Array(9).fill(null));

  const [XY, setXY] = useState(true);

  const clickHandler = (event) => {
    const data = event.target.getAttribute('data')
    const newSquares = squares;
    newSquares[data] = XY ? 'X' : 'Y';
    setXY(!XY);
    setData([...newSquares])
    console.log('X' === 'X');
  }

  return (
    <div className="App">
      {
        squares.map((el, index, squares) => (
          <div key={index} className='cell' onClick={clickHandler} data={index}>{el}</div>
        ))
      }
    </div>
  );
}

export default App;
*/
