import style from '../styles/Cell.module.scss'
import { useState } from 'react'


const playSize = 10;
const falseArray = new Array(playSize)
const falseFill = new Array(playSize)
falseArray.fill(false)
falseFill.fill(falseArray)

const Cell = () => {

  const [cellInfo, setCellInfo] = useState(falseFill)

  const handleClick = (clickedX, clickedY) => {
    const changedInfo = cellInfo.map((array, x) => {
      return (
        array.map((value, y) => {
          return (clickedX === x && clickedY === y ? true : value)
        })
      )
    })
    setCellInfo(changedInfo)
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
                className={cellInfo[x][y] ? style.clicked : style.unClicked}
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