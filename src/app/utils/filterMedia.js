export default function filterMedia(media, filter) {
    switch(filter) {
        case "Date" :
            const sortedMediaByDate = media.sort((a,b) => {
                return new Date(b.date) - new Date(a.date)
            })
            return sortedMediaByDate
        case "Titre" :
            const sortedMediaByTitle = [...media].sort((a,b) => {
                return a.title.localeCompare(b.title)
            })
            return sortedMediaByTitle
        case "Popularité" :
            const sortedMediaByPopularity = media.sort((a,b) => {
                return b.likes - a.likes
            })
            return sortedMediaByPopularity
        default :
            return media
    }
}