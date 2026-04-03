export default function reducer(state, action) {
    const id = action.payload

    return {
        ...state, 
        likesById : {
            ...state.likesById,
                [id] : state.likesById[id]+1 },
        totalLikes : state.totalLikes+1
    }
}