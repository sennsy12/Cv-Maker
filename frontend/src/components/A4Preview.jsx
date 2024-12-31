import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function A4Preview({ children, scale = 1, className = '' }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      className={`
        relative shadow-lg bg-white
        ${isMobile ? 'w-full' : 'w-[210mm]'}
        ${className}
      `}
      style={{
        height: isMobile ? 'auto' : '297mm',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        marginBottom: isMobile ? '0' : `calc((297mm * ${scale}) - 297mm)`,
      }}
    >
      <div className={`
        ${isMobile ? 'min-h-screen' : 'h-[297mm]'}
        overflow-hidden
        bg-white
      `}>
        {children}
      </div>
    </div>
  )
}

A4Preview.propTypes = {
  children: PropTypes.node.isRequired,
  scale: PropTypes.number,
  className: PropTypes.string
} 