/**
 * Find the list of focusable elements within an element
 * @returns {array} focusableElements - the list of focusable elements
 */
export default function getFocusableElements(element) {
    const focusableSelectors = '[tabindex]:not([tabindex="-1"])'
    let focusableElements = Array.from(element.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null)
        
    return focusableElements
}
