import styles from './notfound.module.css'
import Link from 'next/link'

export default function notFound() {
    return (
        <section className={styles.notfound}>
            <h1>Désolé mais cette page n&apos;existe pas</h1>
            <Link tabIndex={0} className={styles.link} href="/">Revenir à l&apos;accueil</Link>
        </section>
    )
}