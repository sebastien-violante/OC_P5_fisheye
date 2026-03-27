'use client'
import styles from './Gallery.module.css'
import Filters from '../Filters/Filters'
import MediaSticker from '../MediaSticker/MediaSticker'
import { useState, useEffect } from 'react'
import filterMedia from '@/app/filterMedia'
export default function Gallery({media}) {
    
    const filters = ['Popularité','Date', 'Titre']
    const [mainFilter, setMainFilter] = useState('Popularité')
    const [otherFilters, setOtherFilters] = useState(filters.filter(item => item !== mainFilter))
    const [sortedMedia, setSortedMedia] = useState(media)
    console.log(media)
    console.log(sortedMedia)
    function handleFilter(item) {
        setMainFilter(item)
    }

    useEffect(() => {
        function updateDisplay(mainFilter) {
            setOtherFilters(filters.filter(item => item !== mainFilter))
            setSortedMedia(filterMedia(media, mainFilter))
        }
        updateDisplay(mainFilter)
    }, [mainFilter])
    
    return (
        <>
            <section className={styles.filter}>
                <p>Trier par</p>
                <Filters mainFilter={mainFilter} otherFilters={otherFilters} handleFilter={handleFilter} />
            </section>
            <section className={styles.mediaContainer}>
                {sortedMedia.map(medium => <MediaSticker key={medium.image} {...medium}/>)}
            </section>
        </>    
    )
}