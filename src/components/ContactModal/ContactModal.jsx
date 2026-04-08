'use client'
import styles from './ContactModal.module.css'
import { useState, useRef, useEffect } from 'react';
import getFocusables from '@/app/utils/getFocusables';

export default function ContactModal({name, closeForm, formOpen}) {
    
    const [formData, setFormData] = useState({
            firstname: "",
            name:"",
            email: "",
            message: "",
        });
    
    const [errors, setErrors] = useState({});

    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const validateData = () => {
        const errors = {}
        if(!formData.firstname.trim()) errors.firstname = "Le champ prénom est requis"
        if(!formData.name.trim()) errors.name = "Le champ nom est requis"
        if(!formData.email.trim()) {
            errors.email = "Le champ email est requis"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Le format du mail est invalide"
        }
        if(!formData.message.trim()) errors.message = "Le champ message est requis"

        return errors
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const errors = validateData()
        setErrors(errors)
        // Visualisation des données en console
        console.log(formData)
        // Vidage du formulaire
        setFormData({
            firstname: "",
            name: "",
            email: "",
            message: ""
        });
    }

    // Mise en place des éléments de focus et focus initial
    const refForm = useRef([])
    const refFocusables = useRef([])
    useEffect(() => {
        const focusables = getFocusables(refForm)
        refFocusables.current = focusables
        focusables[0].focus()
    },[])

    const handleKeyDown = (event) => {
        const focusables = refFocusables.current
        const first = focusables[0]
        const last = focusables[focusables.length-1]
        
        // sortie modale avec entrée sur croix ou bouton
       // if(event.key === 'Enter' && (document.activeElement === first || document.activeElement === last)) return
        
        // focustrap
        if(event.key === 'Tab') {
            if (event.shiftKey) {
            // appui sur Tab et sur Shift
                if (document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                }
            } else {
                // seulement Tab
                if (document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }
        
        if(event.key === "Escape") closeForm()

        if(event.key === 'Enter') {
            const tagName = document.activeElement.tagName
            if(tagName === 'INPUT') event.preventDefault()
        }
    }

    return (
       <div className={styles.overlay} aria-hidden={formOpen ? false : true}>
            <div className={styles.contactForm} >
                <form 
                    className={styles.form} 
                    aria-labelledby='form-title'
                    noValidate
                    onSubmit={handleSubmit}
                    role="dialog"
                    onKeyDown={handleKeyDown}  
                    ref={refForm}  
                >
                    <button className={styles.closeModal} onClick={closeForm}><img src="/logos/crossCloseModal.svg" alt="Fermer le formulaire"/></button>
                    <h1 id="form-title" className={styles.formTitle}>Contactez-moi {name}</h1>
                    <div className={styles.formgroup}>
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            id="firstname"
                            aria-required="true"
                            aria-invalid={!!errors.firstname}
                            aria-describedby={errors.firstname ? "firstname-error" : undefined}
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        ></input>
                        {errors.firstname && (
                            <span id="firstname-error" role="alert">
                                {errors.firstname}
                            </span>
                        )}
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="name">Nom</label>
                        <input  
                            type="text"
                            name="name"
                            id="name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        ></input>
                        {errors.name && (
                            <span id="name-error" role="alert">
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email</label>
                        <input  
                            type="email"
                            name="email"
                            id="email"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        ></input>
                        {errors.email && (
                            <span id="email-error" role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="message">Votre message</label>
                        <textarea  
                            name="message"
                            id="message"
                            aria-required="true"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : undefined}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.message && (
                            <span id="message-error" role="alert">
                                {errors.message}
                            </span>
                        )}
                    </div>
                    <button type="submit" className={styles.closeButton}>Envoyer</button>
                </form>
            </div>
        </div>
    )
}
