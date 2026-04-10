'use client'
import styles from './ContactModal.module.css'
import { useState, useRef, useEffect } from 'react';
import getFocusables from '@/app/utils/getFocusables';
import validateForm from '@/app/utils/validateForm';
export default function ContactModal({name, closeForm, formOpen}) {
    
    // Initialisation du collecteur de données du formulaire
    const [formData, setFormData] = useState({
            firstname: "",
            name:"",
            email: "",
            message: "",
        });
    
    // Initialisation du collecteur d'erreurs
    const [errors, setErrors] = useState({});

    // Remplissage du formData à chaque changement d'input
    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }

    // Gestion du submit, affichage des données et vidage du formulaire  
    const handleSubmit = (event) => {
        event.preventDefault()
        const validationErrors = validateForm(formData)
        setErrors(validationErrors)
        if(!validationErrors.name && !validationErrors.firstname && !validationErrors.email && !validationErrors.message)
        {
            console.log(formData)
            setFormData({
                firstname: "",
                name: "",
                email: "",
                message: ""
            });
        }
    }

    // Mise en place des éléments de focus et focus initial
    const refForm = useRef([]) // va chercher la référence 
    const refFocusables = useRef([]) // permet de stocker les focusables
    useEffect(() => {
        if(!formOpen) return
        const focusables = getFocusables(refForm)
        refFocusables.current = focusables
        if(focusables.length > 0) focusables[0].focus()
    },[formOpen])

    // Gestion des actions clavier 
    const handleKeyDown = (event) => {
        const focusables = refFocusables.current
        const first = focusables[0]
        const last = focusables[focusables.length-1]
                
        if(event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                }
            } else {
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
       <div className={styles.overlay} onClick={closeForm}>
            <section 
                className={styles.contactForm}
                onClick={(event) => event.stopPropagation()} 
                role="dialog" 
                aria-modal="true" 
                aria-labelledby='form-title'>
                <form 
                    className={styles.form} 
                    noValidate
                    onSubmit={handleSubmit}
                    onKeyDown={handleKeyDown}  
                    ref={refForm}  
                >
                    <button type="button" aria-label="Fermer le formulaire" className={styles.closeModal} onClick={closeForm}><img src="/logos/crossCloseModal.svg" alt="Fermer le formulaire"/></button>
                    <h1 id="form-title" className={styles.formTitle}>Contactez-moi</h1>
                    <h2 className={styles.formSubTitle}>{name}</h2>
                    <div className={styles.formgroup}>
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            id="firstname"
                            aria-invalid={errors.firstname ? "true" : "false"}
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
                            aria-invalid={errors.name ? "true" : "false"}
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
                            aria-invalid={errors.email ? "true" : "false"}
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
                            aria-invalid={errors.message ? "true" : "false"}
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
                    <button type="submit" aria-label="Soumettre le formulaire" className={styles.closeButton}>Envoyer</button>
                </form>
            </section>
        </div>
    )
}
