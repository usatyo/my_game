import style from '../styles/Cell.module.scss'
import { useState } from 'react'

const playSize = 10;
const undefArray = new Array(playSize)
const undefFill = new Array(playSize)
undefArray.fill(undefined)
undefFill.fill(undefArray)

const Cell = () => {

  const [cellInfo, setCellInfo] = useState(undefFill)
  const [isRed, setIsRed] = useState(true)

  const handleClick = (clickedX, clickedY) => {
    if(cellInfo[clickedX][clickedY] !== undefined) return

    const changedInfo = cellInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (clickedX !== x || clickedY !== y ? value : (
            isRed ? true : false
          ))
        })
      )
    })
    setCellInfo(changedInfo)
    setIsRed(!isRed)
  }

  console.log(cellInfo[0][0])
  return (
    <>
      {cellInfo.map((array, x) => {
        return (
          array.map((value, y) => {
            return (
              <input
                type="button"
                className={cellInfo[x][y] === undefined ? style.unColored : (
                  cellInfo[x][y] ? style.red : style.blue
                ) }
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