import styles from './MediaSticker.module.css'
import Image from 'next/image'

export default function MediaSticker({medium, openLightBox, increaseLikes, likes}) {
    console.log(medium)
    return (
        <figure className={styles.mediaContainer}>
            <button className={styles.btnImage} onClick={() => openLightBox(medium)}>
                { !medium.video &&
                <Image height={300} width={350} className={styles.image} src={`/pictures/${medium.image}`} alt={medium.title}/>
                }
                { medium.video && 
                <video controls width="100%">
                    <source src={`/pictures/${medium.video}`} controls  style={{ width: "100%" }} type="video/mp4" />
                </video>
                }
                </button>
            <div className={styles.caption}>
                <p className={styles.title}>{medium.title}</p>
                <div className={styles.likes}>
                    <p className={styles.numberLikes} onClick={() => increaseLikes(medium.id)}>{likes}</p>
                    <img className={styles.likeLogo} src="/logos/like.png" alt="likes"></img>
                </div>
            </div>
        </figure>
    )
}