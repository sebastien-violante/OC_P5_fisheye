import styles from './GlobalLikes.module.css'

export default function GlobalLikes({likes, price}) {
    return (
        <section className={styles.data}>
            <div className={styles.likesCounter}>{likes}<img className={styles.hearts} src="/logos/black-heart.svg" alt="coeurs"/></div>
            <div>{price}&euro;/jour</div>
        </section>
    )
}