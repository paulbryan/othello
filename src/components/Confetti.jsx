import { useEffect } from 'react';
import './Confetti.css';

const Confetti = ({ show }) => {
  useEffect(() => {
    if (!show) return;

    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#6bcf7f', '#c44569', '#5f27cd'];

    // Create confetti pieces
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
      });
    }

    function updateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let stillActive = false;

      confettiPieces.forEach(piece => {
        // Update position
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.velocityY += piece.gravity;
        piece.rotation += piece.rotationSpeed;

        // Check if still on screen
        if (piece.y < canvas.height + 50) {
          stillActive = true;
        }

        // Draw confetti
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        ctx.restore();
      });

      if (stillActive) {
        requestAnimationFrame(updateConfetti);
      } else {
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 500);
      }
    }

    updateConfetti();
  }, [show]);

  return (
    <canvas
      id="confetti-canvas"
      className={`confetti-canvas ${show ? 'show' : ''}`}
    />
  );
};

export default Confetti;
