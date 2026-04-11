'use client'
import styles from './LightBox.module.css'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import getFocusables from '@/app/utils/getFocusables'

export default function LightBox({closeLightbox, picture, changePicture}) {

    // initialisation des focusables et focus initial
    const refOverlay = useRef(null)
    const refFocusables = useRef(null)
    useEffect(() => {
        const focusables = getFocusables(refOverlay)
        refFocusables.current = focusables
        focusables[0].focus()
    },[])

    // gestion des actions clavier
    const handleKeyDown = ((event) => {
        const focusables = refFocusables.current
        const first = focusables[0]
        const last = focusables[focusables.length -1]

        if(event.key === 'Tab') {
            if (event.shiftKey) {
            // appui sur Tab et sur Shift
                if (document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                }
            } else {
                // seulement Tab
                if (document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }
        
        if(event.key === "Escape") closeLightbox()

        if(event.key === 'Enter') {
            const tagName = document.activeElement.tagName
            if(tagName === 'INPUT') event.preventDefault()
        }

        if(event.key === 'ArrowRight') {
            event.preventDefault()
            changePicture('next')
        }

        if(event.key === 'ArrowLeft') {
            event.preventDefault()
            changePicture('previous')
        }
        
        if(event.key === 'ArrowUp' || event.key === 'ArrowDown') event.preventDefault()
    })

    

    return (
        <div className={styles.overlay} ref={refOverlay} onKeyDown={handleKeyDown}  >
            <div 
                className={styles.lightbox}
                role="dialog"
                aria-modal="true"
                aria-label="visionneuse de média"
            >
                <button 
                    className={styles.btnCloseLightbox}
                    aria-label="Fermer la visionneuse de média"
                    onClick={() => closeLightbox()}
                >
                    <img src="/logos/closeLightbox.svg" alt="fermer la visionneuse"/>
                </button>
                <button 
                    className={`${styles.arrowBtn} ${styles.previous}`}
                    onClick={() => changePicture('previous')}
                    onKeyDown={(event) => {
                        if(event.key==="Enter" || event.key===" ") { 
                            event.preventDefault()
                            changePicture('previous')
                        }
                    }}
                >
                    <img 
                    src="/logos/leftArrow.svg" 
                    className={styles.arrow} 
                    alt="image précédente" 
                    
                    />
                </button>
                
                { !picture.video &&
                <Image height={900} width={1050} className={styles.image} src={`/pictures/${picture.image}`} alt={picture.title}/>
                }
                { picture.video && 
                <video width="1050px" height="900px" autoPlay muted>
                    <source src={`/pictures/${picture.video}`} controls  style={{ width: "100%" }} type="video/mp4" />
                </video>
                }






                <button 
                    className={`${styles.arrowBtn} ${styles.next}`}
                    onClick={() => changePicture('next')}
                    onKeyDown={(event) => {
                        if(event.key==="Enter" || event.key===" ") { 
                            event.preventDefault()
                            changePicture('next')
                        }
                    }}
                >
                    <img 
                    src="/logos/rightArrow.svg" 
                    className={styles.arrow} 
                    alt="image suivante" 
                    />
                </button>
                
            </div>
        </div>
    )
}