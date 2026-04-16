'use client'
import styles from './Gallery.module.css'
import Filters from '../Filters/Filters'
import MediaSticker from '../MediaSticker/MediaSticker'
import { useState, useEffect, useMemo, useReducer } from 'react'
import filterMedia from '@/app/utils/filterMedia'
import LightboxPortal from '../Portals/LightboxPortal'
import updateIndex from '@/app/utils/updateIndex'
import likesReducer from '@/app/utils/likesReducer'
import { useFocus } from '@/app/providers/FocusProvider'
import GlobalLikes from '../GlobalLikes/GlobalLikes'

export default function Gallery({media, price}) {
    
//////////// CONSTANTES ////////////////////////

    const filters = ['Popularité','Date', 'Titre']

//////////// STATES ////////////////////////////

    const [mainFilter, setMainFilter] = useState('Popularité')
    const [selectedPicture, setSelectedPicture] = useState(null)
    const {focusState} = useFocus()
    console.log(focusState.element)
//////////// DERIVED STATE ////////////////////

    const otherFilters = filters.filter(item => item !== mainFilter)
    const sortedMedia = useMemo(() => {
        return filterMedia(media, mainFilter)
    }, [media, mainFilter])
   
/////////// HANDLERS  ///////////////////////////

    // Force selectedPicture à true pour permettre l'affichage du portail
    const openLightBox = (medium) => {
        setSelectedPicture(medium)
    }

    // Ferme le lightbox et remet le focus sur le dernier média cliqué avant ouverture
    const closeLightbox = () => {
        setSelectedPicture(null)
        focusState.element?.focus()
    }

    // Change l'image sélectionnée en fonction du bouton sélectionné et la retransmet au portail
    const changePicture = (type) => {
        const index = sortedMedia.indexOf(selectedPicture)
        const newIndex = updateIndex(index, type, sortedMedia.length)
        setSelectedPicture(sortedMedia[newIndex])
    }

    // Capte l'item cliqué et l'affecte à main filter
    const handleFilter = (item) => {
        setMainFilter(item)
    }

    // Active le reducer le likes en transmettant un type d'action (increase ou null) et un id
    const updateLikes = (type, id) => {
        dispatchLikes({type: type, payload:id})
    }

///////////  EFFECTS ///////////////////////////

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === "Escape") closeLightbox()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown' , handleKeyDown)
    }, [])
    
//////////////// REDUCER  ////////////////////////////
    
    const determineLikesState = (media) => {
        const likesById = {}
        let totalLikes = 0

        media.map(medium => {
            likesById[medium.id] = medium.likes
            totalLikes+=medium.likes
        })

        return {likesById, totalLikes}
    }

    const [likeState, dispatchLikes] = useReducer(likesReducer, media, determineLikesState)
    
    return (
        <>
            {selectedPicture && <LightboxPortal closeLightbox={closeLightbox} picture={selectedPicture} changePicture={changePicture} />}
            <section className={styles.filter}>
                <Filters mainFilter={mainFilter} otherFilters={otherFilters} handleFilter={handleFilter}/>
            </section>
            <section className={styles.mediaContainer}>
                {sortedMedia.map(medium => <MediaSticker key={medium.image} medium={medium} openLightBox={openLightBox} updateLikes={updateLikes} likes={likeState.likesById[medium.id]}/>)}
            </section>
            <GlobalLikes likes={likeState.totalLikes} price={price}/>
        </>    
    )
}