import styles from './MediaSticker.module.css'
import Image from 'next/image'

export default function MediaSticker({title, image, likes}) {
    
    return (
        <article className={styles.article}>
            <Image height={300} width={350} className={styles.image} src={`/pictures/${image}`} alt=""/>
            <div className={styles.caption}>
                <p className={styles.title}>{title}</p>
                <div className={styles.likes}>
                    <p className={styles.numberLikes}>{likes}</p>
                    <img className={styles.likeLogo} src="/logos/like.png" alt="likes"></img>
                </div>
            </div>
        </article>
    )
}