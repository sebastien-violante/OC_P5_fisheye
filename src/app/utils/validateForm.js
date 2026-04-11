
/**
 * Renvoie les erreurs sur les champs de formulaire
 * @param {Object} formData - les données récoltées dans les champs du formulaire
 * @returns {Object} errors - les erreurs
 */
export default function validateFrom(formData) {
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