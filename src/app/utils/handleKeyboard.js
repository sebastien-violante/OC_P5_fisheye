export default function handleKeyboard(event, options) {

    const { first, last, onEscape, extraHandlers = {} } = options
    const active = document.activeElement

     const handlers = {
        Tab: (event) => {
            if (event.shiftKey && active === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && active === last) {
                event.preventDefault()
                first.focus()
            }
        },

        Escape: () => {
            onEscape?.()
        },

        Enter: (event) => {
            if (active.tagName === 'INPUT') {
                event.preventDefault()
            }
        },

        ...extraHandlers
    }

    handlers[event.key]?.(event)
}