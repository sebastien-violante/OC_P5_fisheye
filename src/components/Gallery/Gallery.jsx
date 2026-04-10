'use client'
import styles from './Gallery.module.css'
import Filters from '../Filters/Filters'
import MediaSticker from '../MediaSticker/MediaSticker'
import { useState, useEffect, useReducer } from 'react'
import filterMedia from '@/app/utils/filterMedia'
import LightboxPortal from '../Portals/LightboxPortal'
import updateIndex from '@/app/utils/updateIndex'
import reducer from '@/app/utils/reducer'

export default function Gallery({media, price}) {
    
    const filters = ['Popularité','Date', 'Titre']
    const [mainFilter, setMainFilter] = useState('Popularité')
    const [otherFilters, setOtherFilters] = useState(filters.filter(item => item !== mainFilter))
    const [sortedMedia, setSortedMedia] = useState(media)
    
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

    const determineLikesState = (media) => {
        const likesById = {}
        let totalLikes = 0

        media.map(medium => {
            likesById[medium.id] = medium.likes
            totalLikes+=medium.likes
        })

        return {likesById, totalLikes}
    }
    const initialState = determineLikesState(sortedMedia)
    const [state, dispatch] = useReducer(reducer, initialState)
        
    const updateLikes = (type, id) => {
        dispatch({type: type, payload:id})
    }

    
    return (
        <>
            {selectedPicture && <LightboxPortal closeLightbox={closeLightbox} picture={selectedPicture} changePicture={changePicture} />}
            <section className={styles.filter}>
                <Filters mainFilter={mainFilter} otherFilters={otherFilters} handleFilter={handleFilter}/>
            </section>
            <section className={styles.mediaContainer}>
                {sortedMedia.map(medium => <MediaSticker key={medium.image} medium={medium} openLightBox={openLightBox} updateLikes={updateLikes} likes={state.likesById[medium.id]}/>)}
            </section>
            <section className={styles.data}>
                <div className={styles.likesCounter}>{state.totalLikes}<img className={styles.hearts} src="/logos/black-heart.svg" alt="coeurs"/></div>
                <div>{price}&euro;/jour</div>
            </section>
        </>    
    )
}