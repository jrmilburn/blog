import { NavLink, Outlet } from "react-router-dom"
import styles from './styles/root.module.css'

export default function Root() {

    return(
       
        <>

            <div className={styles["nav"]}>
                <div className={styles["header"]}>
                    <h2>JM.</h2>
                </div>
                <ul>
                    <div className={styles["nav-links"]}>
                        <div className={styles["link-container"]}>
                            <div className={styles["link"]}>
                                <NavLink
                                    to='/'>
                                    Home
                                </NavLink>
                            </div>
                        </div>

                        <div className={styles["link-container"]}>
                            <div className={styles["link"]}>
                                <NavLink
                                    to='works'>
                                    Works
                                </NavLink>
                            </div>
                        </div>

                        <div className={styles["link-container"]}>
                            <div className={styles["link"]}>
                                <NavLink
                                    to='blog'>
                                    Blog
                                </NavLink>
                            </div>
                        </div>

                        <div className={styles["link-container"]}>
                            <div className={styles["link"]}>
                                <NavLink
                                    to='contact'>
                                    Contact
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
            <div className={styles["main-content"]}>
                <Outlet />
            </div>
        </>
    
    )

}