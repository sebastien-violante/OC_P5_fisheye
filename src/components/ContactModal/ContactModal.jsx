import styles from './ContactModal.module.css'

export default function ContactModal() {
    return (
       <div className={styles.overlay}>
            <form className={styles.form}>
               <label htmlFor="name">Nom</label>
               <input type="text" name="name" id="name"></input>
            </form>
        </div>
    )
}
