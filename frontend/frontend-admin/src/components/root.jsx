import { NavLink, Outlet } from "react-router-dom"
import styles from './styles/root.module.css'

export default function Root() {

    

    return (
        <>
        
            <div className={styles["nav"]}>

                <div className={styles["navbar"]}>
                    <ul>
                        <NavLink to="/posts">
                            <li>Posts</li>
                        </NavLink>
                        <NavLink to="/comments">
                            <li>Comments</li>
                        </NavLink>
                        <NavLink to="/users">
                            <li>Users</li>
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