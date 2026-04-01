'use client'
import styles from './Gallery.module.css'
import Filters from '../Filters/Filters'
import MediaSticker from '../MediaSticker/MediaSticker'
import { useState, useEffect } from 'react'
import filterMedia from '@/app/filterMedia'
import Portal from '../Portals/LightboxPortal'
import updateIndex from '@/app/utils/updateIndex'

export default function Gallery({media}) {
    
    const filters = ['Popularité','Date', 'Titre']
    const [mainFilter, setMainFilter] = useState('Popularité')
    const [otherFilters, setOtherFilters] = useState(filters.filter(item => item !== mainFilter))
    const [sortedMedia, setSortedMedia] = useState(media)
    function handleFilter(item) {
        setMainFilter(item)
    }
    console.log(media)
    useEffect(() => {
        function updateDisplay(mainFilter) {
            setOtherFilters(filters.filter(item => item !== mainFilter))
            setSortedMedia(filterMedia(media, mainFilter))
        }
        updateDisplay(mainFilter)
    }, [mainFilter])

    const [selectedPicture, setSelectedPicture] = useState(null)
    
    const openLightBox = (medium) => {
        console.log(medium)
        setSelectedPicture(medium)
    }

    const changePicture = (type) => {
        const index = sortedMedia.indexOf(selectedPicture)
        const newIndex = updateIndex(index, type, sortedMedia.length)
        setSelectedPicture(sortedMedia[newIndex])
    }

    const closeLightbox = () => {
        setSelectedPicture('')
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === "Escape") closeLightbox()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown' , handleKeyDown)
    })

    
    return (
        <>
            {selectedPicture && <Portal closeLightbox={closeLightbox} picture={selectedPicture} changePicture={changePicture} />}
            <section className={styles.filter}>
                <p>Trier par</p>
                <Filters mainFilter={mainFilter} otherFilters={otherFilters} handleFilter={handleFilter} />
            </section>
            <section className={styles.mediaContainer}>
                {sortedMedia.map(medium => <MediaSticker key={medium.image} medium={medium} openLightBox={openLightBox} />)}
            </section>
        </>    
    )
}