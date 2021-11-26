import style from '../styles/Cell.module.scss'
import { useState } from 'react'

const playSize = 10;
const undefArray = new Array(playSize)
const undefFill = new Array(playSize)
undefArray.fill(undefined)
undefFill.fill(undefArray)

const Cell = () => {

  // undefined -> unclicked
  // null -> yellow(next player can set)
  // true -> red clicked
  // false -> blue clicked
  const [cellInfo, setCellInfo] = useState(undefFill)

  const [isRed, setIsRed] = useState(true)
  let changedInfo = cellInfo

  // const setRedBlueCell = (clickedX, clickedY) => {
  //   const changedInfo = cellInfo.map((array, x) => {
  //     return (
  //       array.map((value, y) => {
  //         return (clickedX === x && clickedY === y ? (
  //           isRed ? 1 : 2
  //         ) : (
  //           value === 0 || value === undefined ? undefined : value
  //         ))
  //       })
  //     )
  //   })
  //   setCellInfo(changedInfo)
  // }

  // // true -> 0 yellow cell 
  // const setYellowCell = (clickedX, clickedY) => {
  //   const changedInfo = cellInfo.map((array, x) => {
  //     return (
  //       array.map((value, y) => {
  //         return (Math.abs(clickedX - x) <= 1
  //         && Math.abs(clickedY - y) <= 1
  //         && value === undefined ? 0 : value)
  //       })
  //     )
  //   })
  //   setCellInfo(changedInfo)
  //   const endGame = false
  //   return endGame
  // }

  const setRedBlueCell = (clickedX, clickedY) => {
    changedInfo = changedInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (clickedX === x && clickedY === y ? (
            isRed ? true : false
          ) : (
            value === null || value === undefined ? undefined : value
          ))
        })
      )
    })
    setCellInfo(changedInfo)
  }

  // true -> 0 yellow cell 
  const setYellowCell = (clickedX, clickedY) => {
    changedInfo = changedInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (Math.abs(clickedX - x) <= 1
            && Math.abs(clickedY - y) <= 1
            && value === undefined ? null : value)
        })
      )
    })
    setCellInfo(changedInfo)
    const endGame = false
    return endGame
  }

  const handleClick = (clickedX, clickedY) => {
    if (changedInfo[clickedX][clickedY] !== undefined
      && changedInfo[clickedX][clickedY] !== null) return

    setRedBlueCell(clickedX, clickedY)
    console.log(changedInfo)
    if (setYellowCell(clickedX, clickedY)) {
      // finish game code
    }
    console.log(changedInfo)
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
                className={value === undefined ? style.unColored : (
                  value === null ? style.yellow : (
                    value ? style.red : style.blue
                  )
                )}
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