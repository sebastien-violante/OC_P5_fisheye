'use client'

import styles from './Filters.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Filters({mainFilter, otherFilters, handleFilter}) {

    const [open, setOpen] = useState(false)
    const refFilters = useRef(null)

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
    })
   

    return (
        <div className={styles.filters}>
                    <button 
                        className={styles.trigger}
                        aria-haspopup="listBox"
                        aria-expanded="false"
                    >{mainFilter}</button>
                    <div className={`${styles.filtersArrow} ${open? styles.rotate : ""}`} onClick={() => setOpen(!open)}></div>
                    {open && (
                       <ul className={styles.listBox} role="listBox" ref={refFilters}>
                        { otherFilters.map(item => (
                            <li key={item} className={styles.listBoxOption} onClick={() => handleFilter(item)}>{item} </li>
                        ))}
                    </ul> 
                    )}
                    
                </div>
    )
}