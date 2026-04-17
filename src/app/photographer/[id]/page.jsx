import styles from './page.module.css'
import { getPhotographer, getAllMediasForPhotographer } from '@/app/lib/prisma-db'
import Image from 'next/image'
import Gallery from '@/components/Gallery/Gallery'
import ContactZone from '@/components/ContactZone/ContactZone'
import { notFound } from 'next/navigation'

export default async function Photographer({params}) {
    
    const { id } = await params
    const photographer = await getPhotographer(Number(id))
    
    if(!photographer) notFound()
    const media = await getAllMediasForPhotographer(Number(id))  

    return (
        <>
            <section className={styles.banner}>
                <article className={styles.ident}>
                    <h1 className={styles.name} tabIndex={0}>{photographer.name}</h1>
                    <p tabIndex={0} className={styles.location}>{photographer.city}, {photographer.country}</p>
                    <p tabIndex={0} className={styles.tagline}>{photographer.tagline}</p>
                </article>
                <ContactZone name={photographer.name} />
                <Image height={200} width={200} className={styles.portrait} src={`/pictures/${photographer.portrait}`} alt={photographer.name} tabIndex={0}/>
            </section>
            {media ? <Gallery media={media} price={photographer.price}/> : <p>Désolé, {photographer.name} n’a encore rien publié !</p>}
        </>
    )
}