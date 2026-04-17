'use client'
import styles from './MediaSticker.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useFocus } from '@/app/providers/FocusProvider'

export default function MediaSticker({medium, openLightBox, updateLikes, likes}) {

///// HOOKS  ///////////////////////////////////////////////

    const {focusDispatch} = useFocus()

///// STATES  ///////////////////////////////////////////////
    
    const [liked, setLiked] = useState(true)

///// HANDLERS  ///////////////////////////////////////////////

    // Déclenche l'augmentation ou la diminution des likes
    const toggleLike = (id) => {
        setLiked(prev => !prev)
        if(liked) {
            updateLikes("increase", id)
        } else {
            updateLikes(null, id)
        }
    }

    // Déclenche l'ouverture de la lightbox après avoir enregistré activé le focusReducer pour enregistrer le dernier media cliqué
    const handleClick = (event) => {
        focusDispatch({payload: event.currentTarget})
        openLightBox(medium)
    }

    return (
        <figure className={styles.mediaWrapper}>
            <button className={styles.btnImage} onClick={handleClick} aria-label={`{medium.title}, closeup view`}>
                { !medium.video &&
                <Image height={300} width={350} className={styles.image} src={`/pictures/${medium.image}`} alt={medium.title}/>
                }
                { medium.video && 
                <video height={300} width={350} >
                    <source src={`/pictures/${medium.video}`}  type="video/mp4" />
                </video>
                }
            </button>
            <div className={styles.caption}>
                <h2 className={styles.title} tabIndex={0}>{medium.title}</h2>
                <div className={styles.likes}>
                    <p className={styles.numberLikes}>{likes}</p>
                    <button className={styles.likesCta} onClick={() => toggleLike(medium.id)}><img className={styles.likeLogo} src="/logos/like.png" alt="likes"></img></button>
                </div>
            </div>
        </figure>
    )
}