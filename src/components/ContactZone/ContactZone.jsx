'use client'
import { useState } from 'react'
import styles from './ContactZone.module.css'
import ContactModal from '../ContactModal/ContactModal'
import ContactPortal from '../Portals/ContactPortal'

export default function ContactZone({name}) {

    const [formOpen, setFormOpen] = useState(false)

    const closeForm = () => {
        setFormOpen(false)
    }
    return (
        <>
        <button 
            className={styles.contactCta} onClick={() => setFormOpen(prev => !prev)} aria-label="Contact Me">Contactez-moi</button>
        {formOpen && <ContactPortal closeForm={closeForm} formOpen={formOpen} name={name}/>}
        </>
    )
}