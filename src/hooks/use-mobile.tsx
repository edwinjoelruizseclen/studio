
import * as React from "react"

// Define el punto de ruptura para la detección de dispositivos móviles.
const MOBILE_BREAKPOINT = 768

/**
 * Hook de React que devuelve `true` si el ancho de la ventana
 * es menor que el punto de ruptura móvil (768px).
 *
 * @returns {boolean} `true` si es un dispositivo móvil, `false` en caso contrario.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Función que se ejecuta cuando cambia el tamaño de la ventana.
     * Actualiza el estado `isMobile`.
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Agrega un listener para el evento 'change'.
    mql.addEventListener("change", onChange)

    // Establece el estado inicial al montar el componente.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Limpia el listener al desmontar el componente.
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
