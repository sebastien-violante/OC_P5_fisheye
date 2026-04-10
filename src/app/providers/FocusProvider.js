'use client'

import { createContext, useContext, useReducer, useMemo } from "react"
import focusReducer from "../utils/focusReducer"

const FocusContext = createContext()

const initialFocus = {
    focus: {element: null}
}

export function StateProvider({children}) {
    const [focusState, focusDispatch] = useReducer(focusReducer, initialFocus)

    // Garde en mémoire l'objet tant que le "state" ne change pas
    const contextValue = useMemo(() => {
        return { focusState, focusDispatch }
    }, [focusState])

    return (
        <FocusContext.Provider value={contextValue}>
            {children}
        </FocusContext.Provider>
    )
}

export function useFocus() {
    return useContext(FocusContext)
}