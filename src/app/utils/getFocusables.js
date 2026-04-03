/**
 * Find the list of focusable elements within an element
 * @returns {array} focusableElements - the list of focusable elements
 */
export default function getFocusables(element) {

        const focusableSelectors = 'button, [href], input, select, textarea'
        const focusables = Array.from(element.current.querySelectorAll(focusableSelectors))
        
        return focusables
    }
