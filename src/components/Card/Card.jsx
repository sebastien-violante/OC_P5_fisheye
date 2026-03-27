import styles from './Card.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Card({name, city, country, tagline, price, portrait, id}) {
    console.log(portrait)
    return (
        <div className={styles.card}>
            <Link className={styles.portrait} href={`/photographer/${id}`}>
                <div className={styles.pictureContainer}>
                    <Image className={styles.picture} src={`/pictures/${portrait}`} alt="" height={200} width={200}/>
                </div>
                <h2 className={styles.name}>{name}</h2>
            </Link>
            <p className={styles.localisation}>{city}, {country}</p>
            <p className={styles.tagline}>{tagline}</p>
            <p className={styles.price}>{price}&euro;/jour</p>
        </div>
    )
}