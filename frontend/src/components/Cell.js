import style from '../styles/Cell.module.scss'
import { useEffect, useContext } from 'react'
import { clearActions, setActions, unsub } from '../utils/api';
import { AppContext } from '../contexts/AppContext'

const playSize = 5;
const RED = 0
const BLUE = 1
const LIGHTRED = 2
const LIGHTBLUE = 3
const YELLOW = 4

const Cell = () => {
  const { cellInfo, setCellInfo } = useContext(AppContext)
  const { selected, setSelected } = useContext(AppContext)
  const { currentPlace, setCurrentPlace } = useContext(AppContext)
  const { turn, setTurn } = useContext(AppContext)

  const isRed = (turn % 2 === 1)
  let changedInfo = cellInfo.slice()
  let changedPlace = currentPlace.slice()

  const checkPlace = (color) => {
    const conditionBool = changedInfo.map((array, x) => (
      array.map((value, y) => (
        value === undefined && (
          (Math.abs(x - changedPlace[color][0].x) <= 1 && Math.abs(y - changedPlace[color][0].y) <= 1) ||
          (Math.abs(x - changedPlace[color][1].x) <= 1 && Math.abs(y - changedPlace[color][1].y) <= 1)
        )
      ))
    ))
    return conditionBool.map(array => (
      array.reduce((previous, current) => (
        previous || current
      ))
    )).reduce((previous, current) => (
      previous || current
    ))
  }

  const endProcess = () => {
    const redCanPlace = checkPlace(RED)
    const blueCanPlace = checkPlace(BLUE)
    if (!redCanPlace && !blueCanPlace) {
      unsub()
      clearActions()
      console.log('tie')
    } else if (!blueCanPlace && isRed) {
      console.log('red win')
    } else if (!redCanPlace && !isRed) {
      console.log('blue win')
    }
    return
  }

  const colorCell = (targetX, targetY, color) => {
    changedInfo = changedInfo.map((array, x) => (
      array.map((value, y) => (targetX === x && targetY === y) ? color : (
        (value === YELLOW || value === undefined) ? undefined : value
      ))
    ))
    setCellInfo(changedInfo)
    if (color !== RED && color !== BLUE) return
    const moved = (changedPlace[color][0].x === selected.x && changedPlace[color][0].y === selected.y) ? 0 : 1
    changedPlace[color][moved] = { x: targetX, y: targetY }
    setCurrentPlace(changedPlace)
    setActions(turn, targetX, targetY, moved)
    return
  }

  const colorYellowCell = (targetX, targetY) => {
    changedInfo = changedInfo.map((array, x) => (
      array.map((value, y) => (
        Math.abs(targetX - x) <= 1 &&
          Math.abs(targetY - y) <= 1 &&
          (value === undefined || value === YELLOW) ? YELLOW :
          (value === YELLOW || value === undefined) ? undefined : value
      ))
    ))
    setCellInfo(changedInfo)
    setSelected({ x: targetX, y: targetY })
    return
  }

  useEffect(() => {
    colorCell(0, 0, RED)
    colorCell(0, playSize - 1, BLUE)
    colorCell(playSize - 1, 0, BLUE)
    colorCell(playSize - 1, playSize - 1, RED)
    setCurrentPlace([
      [{ x: 0, y: 0 }, { x: playSize - 1, y: playSize - 1 }],
      [{ x: 0, y: playSize - 1 }, { x: playSize - 1, y: 0 }]
    ])
  }, []) // eslint-disable-line

  const handleClick = (clickedX, clickedY) => {
    // if (isRed ? RED : BLUE !== RED) return
    if (changedInfo[clickedX][clickedY] === (isRed ? RED : BLUE)) {
      colorYellowCell(clickedX, clickedY)
      return
    }
    if (changedInfo[clickedX][clickedY] !== YELLOW) return
    colorCell(clickedX, clickedY, isRed ? RED : BLUE)
    colorCell(selected.x, selected.y, isRed ? LIGHTRED : LIGHTBLUE)
    endProcess()
    setTurn(turn + 1)
    return
  }

  return (
    <>
      {changedInfo.map((array, x) => (
        array.map((value, y) => (
          <input
            type='button'
            key={x + '_' + y}
            className={`${style.cell} 
              ${value === undefined ? style.uncolored : (
                value === YELLOW ? style.yellow : (
                  value === RED ? style.red : (
                    value === BLUE ? style.blue : (
                      value === LIGHTRED ? style.lightRed : (
                        value === LIGHTBLUE ? style.lightBlue : ''
                      )))))}`}
            onClick={() => handleClick(x, y)}
            style={{
              top: `${y * 60 + 30}px`,
              left: `${x * 60 + 30}px`,
            }}
          />
        ))
      ))}
    </>
  )
}

export default Cell

// export const firebaseUpdate = (x, y, moved) => {
//   let changedInfo = cellInfo
//   changedInfo[x][y] = BLUE
// }
