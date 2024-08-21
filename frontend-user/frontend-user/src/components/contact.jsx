import AnimatedPage from "./AnimatedPage"
import styles from './styles/contact.module.css';

export default function Contact() {

    return(
        <AnimatedPage>
            <div className={styles["contact"]}>
                <h1>Contact</h1>
            </div>
        </AnimatedPage>
    )

}