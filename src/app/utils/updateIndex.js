/**
 * Renvoie un nouvel index calculé à partir de l'ancien index, d'un type d'action et d'une portée
 * @param {Number} index - l'ancien index
 * @param {String} type - le type d'action
 * @param {Number} range - la portée maximale de l'index
 * @returns 
 */
export default function updateIndex(index, type, range) {
    
    switch(type) {
        case 'previous' :
            index--
            if(index < 0) index = (range-1)
            break
        case 'next' :
            index++
            if(index === range) index = 0
    }
    return index
}