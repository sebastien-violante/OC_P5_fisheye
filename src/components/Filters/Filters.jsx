'use client'
import styles from './Filters.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Filters({ mainFilter, otherFilters, handleFilter }) {

//// REFS  ////////////////////////////////////////
    
    const refFilters = useRef(null)
    const listRef = useRef(null)
    const buttonRef = useRef(null)

//// STATES  ////////////////////////////////////////

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    // Initialisation d'une variable pour permettre un focus initial sur le header
    const [firstFocus, setfirstFocus] = useState(true)
  
//// EFFECTS  ////////////////////////////////////////

    // Permet de débloquer le focus du logo Fisheye
    useEffect(() => {
        setfirstFocus(false)
    }, [])
    
    // Fermeture de la liste déroulante si clic à l'extérieur
    useEffect(() => {
        function handleclick(event) {
            if (refFilters.current && !refFilters.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleclick)
        return () => document.removeEventListener('click', handleclick)
    }, [])

    // Ouverture → focus sur la listbox
    useEffect(() => {
        if (open) {
            setActiveIndex(0)
            setTimeout(() => listRef.current?.focus(),0)
        }
    }, [open])

    // Retour focus bouton à la fermeture
    useEffect(() => {
        if (!open && !firstFocus) {
            buttonRef.current?.focus()
        }
    }, [open])

//// HANDLERS  ////////////////////////////////////////
  
    const handleKeyDown = (event) => {

        if (event.key === "ArrowDown") {
            event.preventDefault()
            setActiveIndex(i => (i + 1) % otherFilters.length)
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            setActiveIndex(i => (i - 1 + otherFilters.length) % otherFilters.length)
        }
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            if (activeIndex >= 0) {
                handleFilter(otherFilters[activeIndex])
                setOpen(false)
            }
        }
        if (event.key === "Escape" || event.key === "Tab") {
            setOpen(false)
        }
    }

    return (
        <>
            <label id="filter-label" className={styles.filterLabel}>
                Trier par
            </label>
            <section className={styles.filters} ref={refFilters}>
                <button
                    ref={buttonRef}
                    className={styles.trigger}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-labelledby="filter-label"
                    onClick={() => setOpen(prev => !prev)}
                    onKeyDown={(event) => {
                        if (event.key === "ArrowDown") {
                            event.preventDefault()
                            setOpen(true)
                        }
                    }}
                >
                    {mainFilter}
                </button>
                <div className={`${styles.filtersArrow} ${open ? styles.rotate : ""}`}></div>
                <ul
                    ref={listRef}
                    className={`${styles.listBox} ${open ? "" : styles.contracted}`}
                    role="listbox"
                    tabIndex={open ? 0 : -1}
                    aria-labelledby="filter-label"
                    aria-activedescendant={
                        activeIndex >= 0 ? `option-${activeIndex}` : undefined
                    }
                    onKeyDown={handleKeyDown}
                >
                    {otherFilters.map((item, i) => (
                        <li
                            id={`option-${i}`}
                            key={item}
                            role="option"
                            aria-selected={i === activeIndex}
                            className={styles.listBoxOption}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => {
                                handleFilter(item)
                                setOpen(false)
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}