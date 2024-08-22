import { NavLink, Outlet } from "react-router-dom";
import styles from './styles/root.module.css';
import settings from '../assets/settings.svg';

export default function Root() {

    

    return (
        <>
        
            <div className={styles["nav"]}>

                <div className={styles["header"]}>

                    <h1>Blog dashboard</h1>
                    <div className={styles["icons"]}>
                        <img src={settings} alt="" width={32} height={32} />

                    </div>

                </div>

                <div className={styles["navbar"]}>
                    <ul>
                        <NavLink to="/posts">
                            <li>Posts</li>
                        </NavLink>
                        <NavLink to="/users">
                            <li>Users</li>
                        </NavLink>
                        <NavLink to="/works">
                            <li>Works</li>
                        </NavLink>
                        <NavLink to="/contact">
                            <li>Contact</li>
                        </NavLink>
                    </ul>
                </div>

                <div className={styles["main"]}>
                    <Outlet />
                </div>

            </div>



        </>
    )

}