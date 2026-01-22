import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    // Find the main scrollable container
    const mainElement = document.querySelector('main')
    
    if (!mainElement) return

    const toggleVisibility = () => {
      if (mainElement.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    mainElement.addEventListener('scroll', toggleVisibility)
    
    // Also check on window scroll as fallback
    const handleWindowScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener('scroll', handleWindowScroll)

    return () => {
      mainElement.removeEventListener('scroll', toggleVisibility)
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [])

  const scrollToTop = () => {
    const mainElement = document.querySelector('main')
    
    if (mainElement) {
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
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary-600 dark:bg-primary-500 text-white shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-300 hover:scale-110 active:scale-95 animate-scale-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
