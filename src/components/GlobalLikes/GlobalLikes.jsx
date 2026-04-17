import styles from './GlobalLikes.module.css'

export default function GlobalLikes({likes, price}) {
    return (
        <section className={styles.data}>
            <button className={styles.likesCounter}>{likes}<img className={styles.hearts} src="/logos/black-heart.svg" alt="likes"/></button>
            <p>{price}&euro;/jour</p>
        </section>
    )
}