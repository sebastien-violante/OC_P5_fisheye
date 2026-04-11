import styles from './notfound.module.css'
import Link from 'next/link'

export default function notFound() {
    return (
        <section className={styles.notfound}>
            <h1>Erreur 404</h1>
            <p>Désolé, ce photographe n’est pas référencé sur notre site</p>
            <Link tabIndex={0} className={styles.link} href="/">Revenir à l&apos;accueil</Link>
        </section>
    )
}