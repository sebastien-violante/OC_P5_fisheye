/**
 * Renvoie une copie d'un état qui prend en compte un élément fourni en action
 * @param {Object} likeState - le state en mémoire
 * @param {Object} action - le changement à prendre en compte. Il comprend un type et une payload
 * @returns {Object} likeState - un nouvel état
 */
export default function likesReducer(likeState, action) {
    const id = action.payload
    const type = action.type
       
    // Nouvelle valeur de likes pour l'item id
    const newLikeById = type==="increase" ?
        likeState.likesById[id] + 1 :
        likeState.likesById[id] - 1
    
    // Recalcul des likes par id
    const newLikesById = {
        ...likeState.likesById,
            [id] : newLikeById
    }

    // Calcul du nouveau nombre total de likes
    const newTotalLikes = Object.values(newLikesById).reduce((sum, val) => sum + val, 0);

    return {
        ...likeState, 
        likesById : newLikesById,
        totalLikes : newTotalLikes
    }
}