'use client'
import styles from './MediaSticker.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function MediaSticker({medium, openLightBox, updateLikes, likes}) {

    const [liked, setLiked] = useState(true)
    const toggleLike = (id) => {
        setLiked(prev => !prev)
        if(liked) {
            updateLikes("increase", id)
        } else {
            updateLikes(null, id)
        }
    }
    return (
        <figure className={styles.mediaContainer}>
            <button className={styles.btnImage} onClick={() => openLightBox(medium)}>
                { !medium.video &&
                <Image height={300} width={350} className={styles.image} src={`/pictures/${medium.image}`} alt={medium.title}/>
                }
                { medium.video && 
                <video width="100%" height="300px">
                    <source src={`/pictures/${medium.video}`} controls  style={{ width: "100%" }} type="video/mp4" />
                </video>
                }
                </button>
            <div className={styles.caption}>
                <p className={styles.title}>{medium.title}</p>
                <div className={styles.likes}>
                    <p className={styles.numberLikes} onClick={() => toggleLike(medium.id)}>{likes}</p>
                    <button className={styles.likesCta} onClick={() => toggleLike(medium.id)}><img className={styles.likeLogo} src="/logos/like.png" alt="likes"></img></button>
                </div>
            </div>
        </figure>
    )
}