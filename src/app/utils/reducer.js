/**
 * Renvoie une copie d'un état qui prend en compte un élément fourni en action
 * @param {Object} state - le state en mémoire
 * @param {Object} action - le changement à prendre en compte. Il comprend un type et une payload
 * @returns {Object} state - un nouvel état
 */
export default function reducer(state, action) {
    const id = action.payload
    const type = action.type
       
    // Nouvelle valeur de likes pour l'item id
    const newLikeById = type==="increase" ?
        state.likesById[id] + 1 :
        state.likesById[id] - 1
    
    // Recalcul des likes par id
    const newLikesById = {
        ...state.likesById,
            [id] : newLikeById
    }

    // Calcul du nouveau nombre total de likes
    const newTotalLikes = Object.values(newLikesById).reduce((sum, val) => sum + val, 0);

    return {
        ...state, 
        likesById : newLikesById,
        totalLikes : newTotalLikes
    }
}