'use client'
import { useState } from 'react'
import styles from './ContactZone.module.css'
import ContactPortal from '../Portals/ContactPortal'
import { useFocus } from '@/app/providers/FocusProvider'

export default function ContactZone({name}) {

    const [formOpen, setFormOpen] = useState(false)
    const {focusState, focusDispatch} = useFocus()
    console.log(focusState)
    const closeForm = () => {
        setFormOpen(false)
        focusState.element.focus()
    }

    const handleClick = (event) => {
        focusDispatch({payload: event.currentTarget})
        setFormOpen(prev => !prev)
    }

    return (
        <>
        <button 
            className={styles.contactCta} onClick={handleClick} aria-label="Contact Me">Contactez-moi</button>
        {formOpen && <ContactPortal closeForm={closeForm} formOpen={formOpen} name={name}/>}
        </>
    )
}