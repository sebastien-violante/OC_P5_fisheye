/*'use client'

import styles from './Filters.module.css'
import { useState, useRef, useEffect } from 'react'

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
        <>
        <label className={styles.filterLabel} aria-label='filter-label'>Trier par</label>
        <section className={styles.filters} ref={refFilters}>
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
            
            <ul className={`${styles.listBox} ${open ? "" : styles.contracted}`} role="listbox" aria-labelledby="filter-label">
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
        </section>
        </>
    )
}
'use client'

import styles from './Filters.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Filters({ mainFilter, otherFilters, handleFilter }) {

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const refFilters = useRef(null)
    const optionsRef = useRef([])
    const buttonRef = useRef(null)

    // Fermer si clic extérieur
    useEffect(() => {
        function handleclick(event) {
            if (refFilters.current && !refFilters.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleclick)
        return () => document.removeEventListener('click', handleclick)
    }, [])

    // Quand on ouvre → premier élément actif
    useEffect(() => {
        if (open) {
            setActiveIndex(0)
        }
    }, [open])

    // Focus sur l'élément actif
    useEffect(() => {
        if (open && activeIndex >= 0) {
            optionsRef.current[activeIndex]?.focus()
        }
    }, [activeIndex, open])

    // Revenir au bouton quand on ferme
    useEffect(() => {
        if (!open) {
            buttonRef.current?.focus()
        }
    }, [open])

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
                        if (event.key === "Escape") {
                            setOpen(false)
                        }
                    }}
                >
                    {mainFilter}
                </button>

                <div className={`${styles.filtersArrow} ${open ? styles.rotate : ""}`}></div>

                <ul
                    className={`${styles.listBox} ${open ? "" : styles.contracted}`}
                    role="listbox"
                    aria-labelledby="filter-label"
                >
                    {otherFilters.map((item, i) => (
                        <li
                            key={item}
                            ref={el => optionsRef.current[i] = el}
                            role="option"
                            tabIndex={i === activeIndex ? 0 : -1}
                            aria-selected={i === activeIndex}
                            className={styles.listBoxOption}
                            onClick={() => {
                                handleFilter(item)
                                setOpen(false)
                            }}
                            onKeyDown={(event) => {

                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault()
                                    handleFilter(item)
                                    setOpen(false)
                                }

                                if (event.key === "ArrowDown") {
                                    event.preventDefault()
                                    setActiveIndex((i + 1) % otherFilters.length)
                                }

                                if (event.key === "ArrowUp") {
                                    event.preventDefault()
                                    setActiveIndex((i - 1 + otherFilters.length) % otherFilters.length)
                                }

                                if (event.key === "Escape") {
                                    setOpen(false)
                                }

                                if (event.key === "Tab") {
                                    setOpen(false)
                                }
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}*/
'use client'

import styles from './Filters.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Filters({ mainFilter, otherFilters, handleFilter }) {

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const refFilters = useRef(null)
    const listRef = useRef(null)
    const buttonRef = useRef(null)

    // Initialisation d'une variable pour permettre un focus initial sur le header
    const [firstFocus, setfirstFocus] = useState(true)
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
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
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