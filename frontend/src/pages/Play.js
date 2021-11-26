const playSize = 10;
const myArray = new Array(playSize)
myArray.fill(myArray)

const Play = () => {

  console.log(myArray)

  return (
    <>
      {myArray.map((array, x) => {
        return (
          array.map((value, y) => {
            return (
              <input
                type="button"
                style={{
                  position: 'absolute',
                  height: '50px',
                  width: '50px',
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

export default Play