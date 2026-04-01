import styles from './LightBox.module.css'
import Image from 'next/image'

export default function LightBox({closeLightbox, picture, changePicture}) {

    return (
        <>
                <div className={styles.overlay}>
                    <div 
                        className={styles.lightbox}
                        role="dialog"
                        aria-modal="true"
                        aria-label="visionneuse de média"
                    >
                        <button 
                            className={styles.btnCloseLightbox}
                            aria-label="fermer la visionneuse de média"
                            onClick={() => closeLightbox()}
                        >
                            <img src="/logos/closeLightbox.svg" alt="fermer la visionneuse"/>
                        </button>
                        <img src="/logos/leftArrow.svg" className={styles.arrow} alt="image précédente" onClick={() => changePicture('previous')}/>
                        <Image className={styles.picture} width={1050} height={900} src={`/pictures/${picture.image}`} alt={picture.title} />
                        <img src="/logos/rightArrow.svg" className={styles.arrow} alt="image suivante" onClick={() => changePicture('next')}/>
                    </div>
                </div>
        </>
    )
}