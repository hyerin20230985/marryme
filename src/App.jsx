import { useState, useEffect } from 'react'
import marryKitiImg from './assets/marrykiti.png'
import ghostImg from './assets/ghost.jpg'

function App() {
  const [showImage, setShowImage] = useState(false)
  const [showGhost, setShowGhost] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 })
  const [stars, setStars] = useState([])

  const handleYesClick = () => {
    setShowImage(true)
  }

  const handleNoHover = () => {
    const randomTop = Math.random() * 60 + 10 // 10% ~ 70% from top
    const randomLeft = Math.random() * 60 + 20 // 20% ~ 80% from left
    setNoButtonPosition({ top: randomTop, left: randomLeft })
  }

  const handleNoClick = () => {
    setShowGhost(true)
  }

  const handleMouseMove = (e) => {
    const newStar = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 10 + 5,
      color: ['#FFD700', '#FFF', '#FFB6C1', '#FF69B4', '#FFFFE0'][Math.floor(Math.random() * 5)]
    }
    
    setStars(prev => [...prev, newStar])
    
    setTimeout(() => {
      setStars(prev => prev.filter(star => star.id !== newStar.id))
    }, 1000)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{ background: showGhost ? '#000' : 'transparent', minHeight: '100vh', transition: 'background 0.5s ease' }}>
      {!showGhost && (
        <>
          {/* Star particles */}
          {stars.map(star => (
            <div
              key={star.id}
              className="star-particle"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                backgroundColor: star.color
              }}
            />
          ))}
          
          <div className="flex justify-center text-4xl md:text-6xl text-white font-bold px-4 text-center">
            <h1 className="mt-20 md:mt-20 drop-shadow-lg">{showImage ? '고마워 사랑해❤️' : '나랑 결혼해줄래?'}</h1>
          </div>
          {!showImage ? (
            <div className="flex justify-center mt-20 md:mt-40 relative">
              <button onClick={handleYesClick} className="bg-white text-black px-6 py-2 md:px-10 md:py-2 rounded-full mr-5 drop-shadow-lg text-lg md:text-xl">네</button>
              <button 
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                style={{
                  position: noButtonPosition.top === 0 ? 'relative' : 'fixed',
                  top: noButtonPosition.top === 0 ? 'auto' : `${noButtonPosition.top}%`,
                  left: noButtonPosition.top === 0 ? 'auto' : `${noButtonPosition.left}%`,
                  transition: 'all 0.3s ease'
                }}
                className="bg-white text-black px-6 py-2 md:px-10 md:py-2 rounded-full drop-shadow-lg text-lg md:text-xl"
              >
                아니오
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10 md:mt-20 px-4">
              <img src={marryKitiImg} alt="결혼 이미지" className="w-full max-w-md md:max-w-2xl drop-shadow-2xl fade-in-image" />
            </div>
          )}
        </>
      )}
      
      {showGhost && (
        <div className="flex justify-center items-center h-screen px-4">
          <img src={ghostImg} alt="유령" className="w-full max-w-md md:max-w-2xl fade-in-image" />
        </div>
      )}
    </div>
  )
}

export default App
