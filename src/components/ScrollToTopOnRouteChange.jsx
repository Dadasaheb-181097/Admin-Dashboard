import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Find the main scrollable container
    const mainElement = document.querySelector('main')
    
    if (mainElement) {
      // Scroll main container to top
      mainElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      // Fallback to window scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [pathname])

  return null
}

export default ScrollToTopOnRouteChange
