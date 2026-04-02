import styles from './MediaSticker.module.css'
import Image from 'next/image'

export default function MediaSticker({medium, openLightBox}) {
    return (
        <figure className={styles.mediaContainer}>
            <button className={styles.btnImage} onClick={() => openLightBox(medium)}>
                <Image height={300} width={350} className={styles.image} src={`/pictures/${medium.image}`} alt={medium.title}/>
            </button>
            <div className={styles.caption}>
                <p className={styles.title}>{medium.title}</p>
                <div className={styles.likes}>
                    <p className={styles.numberLikes}>{medium.likes}</p>
                    <img className={styles.likeLogo} src="/logos/like.png" alt="likes"></img>
                </div>
            </div>
        </figure>
    )
}