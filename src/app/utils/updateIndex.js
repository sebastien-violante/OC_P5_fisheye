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