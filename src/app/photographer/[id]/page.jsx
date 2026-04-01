import styles from './page.module.css'
import { getPhotographer, getAllMediasForPhotographer } from '@/app/lib/prisma-db'
import Image from 'next/image'
import Gallery from '@/components/Gallery/Gallery'

export default async function Photographer({params}) {
    
    const { id } = await params
    const photographer = await getPhotographer(Number(id))
    const media = await getAllMediasForPhotographer(Number(id))
    console.log(photographer)
    console.log(media)
        
    return (
        <div className={styles.wrapper}>
            <section className={styles.banner}>
                <article className={styles.ident}>
                    <h1 className={styles.name}>{photographer.name}</h1>
                    <p className={styles.location}>{photographer.city}, {photographer.country}</p>
                    <p className={styles.tagline}>{photographer.tagline}</p>
                </article>
                <button className={styles.contactCta} tabIndex={0}>Contactez-moi</button>
                <div className={styles.pictureContainer}>
                    <Image height={200} width={200} className={styles.portait} src={`/pictures/${photographer.portrait}`} alt={photographer.name}/>
                </div>
            </section>
            <Gallery media={media}/>
            
        </div>
    )
}