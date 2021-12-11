import { createContext, useState } from "react";

const playSize = 5;

const undefArray = new Array(playSize)
const undefCellInfo = new Array(playSize)
undefArray.fill(undefined)
undefCellInfo.fill(undefArray)

const undefPlace = { x: undefined, y: undefined }
const undefPlaces = [undefPlace, undefPlace]
const undefCurrntPlace = [undefPlaces, undefPlaces]

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  // 各マスの色
  const [cellInfo, setCellInfo] = useState(undefCellInfo)
  // 選択されているコマがあるマス
  const [selected, setSelected] = useState(undefPlace)
  // コマのあるマス（１つ目のインデックスで色、２つ目のインデックスでどちらかを指定）
  const [currentPlace, setCurrentPlace] = useState(undefCurrntPlace)
  // 何巡目か
  const [turn, setTurn] = useState(1)
  // 自分の色
  // const [myColor, setMyColor] = useState(undefined)

  return (
    <AppContext.Provider
      value={{
        cellInfo,
        setCellInfo,
        selected,
        setSelected,
        currentPlace,
        setCurrentPlace,
        turn,
        setTurn
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider