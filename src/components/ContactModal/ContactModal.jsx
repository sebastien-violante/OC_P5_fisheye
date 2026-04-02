import styles from './ContactModal.module.css'
import { useState } from 'react';

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
        if(!formData.firstname) errors.firstname = "Le champ prénom est requis"
        if(!formData.name) errors.name = "Le champ nom est requis"
        if(!formData.email) {
            errors.email = "Le champ email est requis"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Le format du mail est invalide"
        }
        if(!formData.message) errors.message = "Le champ message est requis"

        return errors
    }
    
    const handleSubmit = () => {
        event.preventDefault()
        const errors = validateData()
        setErrors(errors)
    }
    return (
       <div className={styles.overlay} aria-hidden={formOpen ? false : true}>
            <div className={styles.contactForm}>
                <button className={styles.closeModal} onClick={closeForm}><img src="/logos/crossCloseModal.svg" alt="Fermer le formulaire"/></button>
                <form 
                    className={styles.form} 
                    aria-labelledby='form-title'
                    noValidate
                    onSubmit={handleSubmit}
                    role="dialog"
                >
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
                            <span id="firstname-error" role="alert">
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
