'use client'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname()
    const isHomePage = pathname === '/'

    return (
        <header className={styles.header}>
            <Link href="/">
                <Image className={styles.logo} width={200} height={50} src="/logos/logo.svg" alt="Logo du site Fisheye"/>
            </Link>
            {isHomePage && <h1 className={styles.static}>Nos photographes</h1>}
        </header>
    )
}