import styles from './page.module.css'
import { getPhotographer, getAllMediasForPhotographer } from '@/app/lib/prisma-db'
import Image from 'next/image'
import Gallery from '@/components/Gallery/Gallery'
import ContactZone from '@/components/ContactZone/ContactZone'

export default async function Photographer({params}) {
    
    const { id } = await params
    const photographer = await getPhotographer(Number(id))
    const media = await getAllMediasForPhotographer(Number(id))
            
    return (
        <div className={styles.wrapper}>
            <section className={styles.banner}>
                <article className={styles.ident}>
                    <h1 className={styles.name}>{photographer.name}</h1>
                    <p className={styles.location}>{photographer.city}, {photographer.country}</p>
                    <p className={styles.tagline}>{photographer.tagline}</p>
                </article>
                <ContactZone name={photographer.name} />
                <div className={styles.pictureContainer}>
                    <Image height={200} width={200} className={styles.portait} src={`/pictures/${photographer.portrait}`} alt={photographer.name}/>
                </div>
            </section>
            <Gallery media={media} price={photographer.price}/>
        </div>
    )
}