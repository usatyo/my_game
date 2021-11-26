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
  const [isRed, setIsRed] = useState(true)
  let changedInfo = cellInfo

  useEffect(() => {
    colorRedBlueCell(0, 0, RED)
    colorRedBlueCell(0, playSize - 1, BLUE)
    colorRedBlueCell(playSize - 1, 0, BLUE)
    colorRedBlueCell(playSize - 1, playSize - 1, RED)
  }, [])

  const colorRedBlueCell = (targetX, targetY, color) => {
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
  }

  const handleClick = (clickedX, clickedY) => {

    if (changedInfo[clickedX][clickedY] === (isRed ? RED : BLUE)){
      colorYellowCell(clickedX, clickedY)
      return
    }
    
    if (changedInfo[clickedX][clickedY] !== YELLOW) return

    colorRedBlueCell(clickedX, clickedY, isRed ? RED : BLUE)
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
                className={
                  value === undefined ? style.unColored : (
                    value === YELLOW ? style.yellow : (
                      value === RED ? style.red : (
                        value === BLUE ? style.blue : (
                          value === LIGHTRED ? style.lightRed : (
                            value === LIGHTBLUE ? style.lightBlue : ''
                          )))))}
                onClick={() => handleClick(x, y)}
                style={{
                  position: 'absolute',
                  height: '50px',
                  width: '50px',
                  top: `${y * 60 + 30}px`,
                  left: `${x * 60 + 30}px`,
                  borderRadius: '10px',
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