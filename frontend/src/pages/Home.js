import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.scss'

const Home = () => {
  // const history = useHistory()

  // const handleClick = () => {
  // }

  return (
    <>
      {/* <input type="button" value='Game Start' onClick={handleClick} /> */}
      <Link to="/playing" className={styles.startButton}>Game Start</Link>
    </>
  )
}

export default Home