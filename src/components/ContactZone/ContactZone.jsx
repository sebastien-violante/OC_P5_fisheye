'use client'
import { useState } from 'react'
import styles from './ContactZone.module.css'
import ContactModal from '../ContactModal/ContactModal'

export default function ContactZone() {

    const [formOpen, setFormOpen] = useState(false)
    return (
        <>
        <button className={styles.contactCta} tabIndex={0} onClick={() => setFormOpen(prev => !prev)}>Contactez-moi</button>
        {formOpen && <ContactModal/>}
        </>
        
    )
}