import Cell from "../components/Cell"
import styles from "../styles/Play.module.scss"

const Play = () => {

  return (
    <>
      <div className={styles.cellWrapper}>
        <Cell />
      </div>
    </>
  )
}

export default Play