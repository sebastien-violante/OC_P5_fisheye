import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <div className={styles.header}>
            <Link href="/">
                <Image className={styles.logo} width={200} height={50} src="/logos/logo.svg" alt="Logo du site Fisheye"/>
            </Link>
            <h1 className={styles.static}>Nos photographes</h1>
        </div>
    )
}