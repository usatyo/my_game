import style from '../styles/Cell.module.scss'
import { useState, useEffect } from 'react'

const playSize = 10;
const YELLOW = 0
const RED = 1
const BLUE = 2
const LIGHTRED = 3
const LIGHTBLUE = 4

const undefArray = new Array(playSize)
const undefFill = new Array(playSize)
undefArray.fill(undefined)
undefFill.fill(undefArray)

const Cell = () => {
  const [cellInfo, setCellInfo] = useState(undefFill)
  const [selectedX, setSelectedX] = useState(undefined)
  const [selectedY, setSelectedY] = useState(undefined)
  const [isRed, setIsRed] = useState(true)
  let changedInfo = cellInfo

  const colorCell = (targetX, targetY, color) => {
    changedInfo = changedInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (targetX === x && targetY === y ? color : (
            value === YELLOW || value === undefined ? undefined : value
          ))
        })
      )
    })
    setCellInfo(changedInfo)
  }
      
  useEffect(() => {
    colorCell(0, 0, RED)
    colorCell(0, playSize - 1, BLUE)
    colorCell(playSize - 1, 0, BLUE)
    colorCell(playSize - 1, playSize - 1, RED)
  }, [])
      
  const colorYellowCell = (targetX, targetY) => {
    changedInfo = changedInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (Math.abs(targetX - x) <= 1
            && Math.abs(targetY - y) <= 1
            && (value === undefined || value === YELLOW) ? YELLOW :
            value === YELLOW || value === undefined ? undefined : value
          )
        })
      )
    })
    setCellInfo(changedInfo)
    setSelectedX(targetX)
    setSelectedY(targetY)
  }

  const handleClick = (clickedX, clickedY) => {

    if (changedInfo[clickedX][clickedY] === (isRed ? RED : BLUE)) {
      colorYellowCell(clickedX, clickedY)
      return
    }

    if (changedInfo[clickedX][clickedY] !== YELLOW) return

    colorCell(clickedX, clickedY, isRed ? RED : BLUE)
    colorCell(selectedX, selectedY, isRed ? LIGHTRED : LIGHTBLUE)
    setIsRed(!isRed)
  }

  return (
    <>
      {changedInfo.map((array, x) => {
        return (
          array.map((value, y) => {
            return (
              <input
                type='button'
                key={x + '_' + y}
                className={`${style.cell} 
                  ${value === undefined ? style.unColored : (
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
            )
          })
        )
      })}
    </>
  )
}

export default Cell