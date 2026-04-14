/**
 * Renvoie une copie d'un state qui conserve en mémoire l'élément portant le dernier focus en cas d'ouverture de modale
 * @param {Object} state le state actuel
 * @returns {Object} state - un nouvel état
 */

export default function focusReducer(state, action) {
    return {
        ...state, element: action.payload
    }
}