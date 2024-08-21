import styles from './styles/homepage.module.css';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import logo from '../assets/selfie.jpg';

export default function Homepage() {

    return(
        <AnimatedPage>
            <div className={styles["homepage"]}>
                <h1>joemilburn.com.au</h1>
                <div className={styles["desc-container"]}>
                    <div className={styles["img-container"]}><img src={logo} alt="" /></div>
                    <ul>
                        <h2>Software Development</h2>
                    </ul>
                </div>
                <div className={styles["next-btn"]}>
                    <Link to='/works'>Works</Link>
                    <span className={styles["next-arrow"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
                    </span>
                </div>
            </div>
        </AnimatedPage>
    )

}