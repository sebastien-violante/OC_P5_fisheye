'use client'
import { useState } from 'react'
import styles from './ContactZone.module.css'
import ContactPortal from '../Portals/ContactPortal'
import { useFocus } from '@/app/providers/FocusProvider'

export default function ContactZone({name}) {

//// HOOKS  ////////////////////////////////////////
    
    const {focusState, focusDispatch} = useFocus()

//// STATE  ////////////////////////////////////////

    const [formOpen, setFormOpen] = useState(false)

//// HANDLERS  ////////////////////////////////////////

    // Ferme le formulaire et place le focus sur le dernier élément cliqué
    const closeForm = () => {
        setFormOpen(false)
        focusState.element.focus()
    }
    // Ouvre le formulaire et envoie au focusReducer le bouton comme dernier élément cliqué
    const handleClick = (event) => {
        focusDispatch({payload: event.currentTarget})
        setFormOpen(prev => !prev)
    }

    return (
        <>
            <button 
                className={styles.contactCta} 
                onClick={handleClick} 
                aria-label="Contact Me">Contactez-moi</button>
            {formOpen && <ContactPortal closeForm={closeForm} formOpen={formOpen} name={name}/>}
        </>
    )
}