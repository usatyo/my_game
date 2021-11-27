import style from '../styles/Cell.module.scss'
import { useState, useEffect } from 'react'

const playSize = 4;
const RED = 0
const BLUE = 1
const LIGHTRED = 2
const LIGHTBLUE = 3
const YELLOW = 4

const undefArray = new Array(playSize)
const undefCellInfo = new Array(playSize)
undefArray.fill(undefined)
undefCellInfo.fill(undefArray)

const undefPlace = { x: undefined, y: undefined }
const undefPlaces = [undefPlace, undefPlace]
const undefCurrntPlace = [undefPlaces, undefPlaces]

const Cell = () => {
  // 各マスの色
  const [cellInfo, setCellInfo] = useState(undefCellInfo)
  // 選択されているコマがあるマス
  const [selected, setSelected] = useState(undefPlace)
  // コマのあるマス（１つ目のインデックスで色、２つ目のインデックスでどちらかを指定）
  const [currentPlace, setCurrentPlace] = useState(undefCurrntPlace)
  // どちらの番か
  const [isRed, setIsRed] = useState(true)
  let changedInfo = cellInfo
  let changedPlace = currentPlace.slice()

  const checkWinner = (color) => {
    const conditionArray = changedInfo.map((array, x) => (
      array.map((value, y) => (
        value === undefined && (
          (Math.abs(changedPlace[color][0].x - x) <= 1 && Math.abs(changedPlace[color][0].y - y) <= 1) ||
          (Math.abs(changedPlace[color][1].x - x) <= 1 && Math.abs(changedPlace[color][1].y - y) <= 1)
        )
      ))
    ))
    return conditionArray.map(array => (
      array.reduce((previous, current) => (
        previous || current
      ))
    )).reduce((previous, current) => (
      previous || current
    ))
  }

  const endProcess = () => {
    const redCanPlace = checkWinner(RED)
    const blueCanPlace = checkWinner(BLUE)
    if (!redCanPlace && !blueCanPlace) {
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
    let moved = 0
    if (changedPlace[color][1].x === selected.x && changedPlace[color][1].y === selected.y) {
      moved = 1
    }
    changedPlace[color][moved].x = targetX
    changedPlace[color][moved].y = targetY
    setCurrentPlace(changedPlace)
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
  }, [])

  const handleClick = (clickedX, clickedY) => {
    if (changedInfo[clickedX][clickedY] === (isRed ? RED : BLUE)) {
      colorYellowCell(clickedX, clickedY)
      return
    }
    if (changedInfo[clickedX][clickedY] !== YELLOW) return
    colorCell(clickedX, clickedY, isRed ? RED : BLUE)
    colorCell(selected.x, selected.y, isRed ? LIGHTRED : LIGHTBLUE)
    endProcess()
    setIsRed(!isRed)
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