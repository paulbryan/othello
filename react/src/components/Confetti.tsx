import { useEffect, useRef } from 'react'

interface ConfettiPiece {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
}

interface ConfettiProps {
  active: boolean;
}

function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiPieces: ConfettiPiece[] = []
    const confettiCount = 150
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#6bcf7f', '#c44569', '#5f27cd']

    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        velocityX: Math.random() * 4 - 2,
        velocityY: Math.random() * 3 + 2,
        gravity: 0.2
      })
    }

    let animationId: number
    function updateConfetti() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      let stillActive = false

      confettiPieces.forEach(piece => {
        piece.x += piece.velocityX
        piece.y += piece.velocityY
        piece.velocityY += piece.gravity
        piece.rotation += piece.rotationSpeed

        if (piece.y < canvas!.height + 50) {
          stillActive = true
        }

        ctx!.save()
        ctx!.translate(piece.x, piece.y)
        ctx!.rotate((piece.rotation * Math.PI) / 180)
        ctx!.fillStyle = piece.color
        ctx!.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height)
        ctx!.restore()
      })

      if (stillActive) {
        animationId = requestAnimationFrame(updateConfetti)
      }
    }

    updateConfetti()

    return () => {
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId)
      }
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2000,
      }}
    />
  )
}

export default Confetti
