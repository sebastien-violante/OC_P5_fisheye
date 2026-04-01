'use client'

import getFocusableElements from '@/app/utils/getFocusableElements'
import styles from './Filters.module.css'
import { useState, useRef, useEffect, use } from 'react'

export default function Filters({mainFilter, otherFilters, handleFilter}) {

    const [open, setOpen] = useState(false)
    const refFilters = useRef(null)
    const [activeIndex, setActiveIndex] = useState(-1)

    // Fermeture de la liste si clic en dehors
    useEffect(() => {
        function handleclick(event) {
            if(refFilters.current && !refFilters.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleclick)

        return () => {
            document.removeEventListener('click', handleclick)
        }
    }, [])

    // Au changement d'état de open, détermination de l'index actif
    useEffect(() => {
        if(open) {
            setActiveIndex(0)
        }
    },[open])

    // Au changement d'état de open, détermination des éléments focusables et focus sur l'index actif
    useEffect(() => {
        if(open) {
            const focusables = refFilters.current.querySelectorAll('[role="option"]')
            focusables[activeIndex]?.focus()
        }
    },[open, activeIndex])
   

    return (
        <div className={styles.filters} ref={refFilters}>
            <button 
                className={styles.trigger}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                onKeyDown={(event) => {
                    if(event.key==="Enter" || event.key===" ") { 
                        event.preventDefault()
                        setOpen(prev => !prev)
                    }
                    if(event.key==="Escape") {
                        setOpen(false)
                    } 
                }}
            >{mainFilter}</button>
            <div className={`${styles.filtersArrow} ${open? styles.rotate : ""}`}></div>
            
            <ul className={`${styles.listBox} ${open ? "" : styles.contracted}`} role="listBox">
                { otherFilters.map(item => (
                    <li 
                        tabIndex={open ? 0 : -1}
                        role="option"
                        key={item} 
                        className={styles.listBoxOption} 
                        onClick={() => {
                            handleFilter(item)
                            setOpen(false)
                        }}
                        onKeyDown={(event) => {
                            if(event.key==="Enter" || event.key===" ") { 
                                event.preventDefault()
                                handleFilter(item)
                                setOpen(prev => !prev)
                            }
                            if(event.key==="ArrowDown") {
                                event.preventDefault()
                                setActiveIndex(index => (index + 1) % otherFilters.length)
                                console.log(activeIndex)
                            }
                            if(event.key==="ArrowUp") {
                                event.preventDefault()
                                setActiveIndex(index => (index - 1 + otherFilters.length) % otherFilters.length)
                            }
                            if(event.key==="Escape") {
                                event.preventDefault()
                                setOpen(false)
                            }
                             if(event.key==="Tab") {
                                setOpen(false)
                            }
                        }}
                        >{item}
                    </li>
                ))}
            </ul> 
        
        </div>
    )
}