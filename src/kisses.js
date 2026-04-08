// Chuva de beijinhos caindo de cima pra baixo 💋

const EMOJIS = ['💋', '😘', '💕', '❤️', '💗', '💖', '🥰', '✨']

export function spawnKisses(count = 8) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createKiss(), i * 120)
  }
}

export function spawnKiss() {
  createKiss()
}

function createKiss() {
  const el = document.createElement('div')
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
  el.textContent = emoji
  el.setAttribute('aria-hidden', 'true')

  const x = Math.random() * window.innerWidth * 0.9 + window.innerWidth * 0.05
  const size = 18 + Math.random() * 28

  Object.assign(el.style, {
    position: 'fixed',
    left: `${x}px`,
    top: `-50px`,
    fontSize: `${size}px`,
    zIndex: '9999',
    pointerEvents: 'none',
    userSelect: 'none',
    opacity: '1',
    willChange: 'transform, opacity',
  })

  document.body.appendChild(el)

  const duration = 2200 + Math.random() * 1500
  const drift = (Math.random() - 0.5) * 150
  const swaySpeed = 2 + Math.random() * 3
  const swayAmount = 30 + Math.random() * 40
  const start = performance.now()
  const targetY = window.innerHeight + 60

  function animate(now) {
    const t = Math.min((now - start) / duration, 1)
    // queda suave com leve aceleração
    const ease = t * t * (3 - 2 * t) // smoothstep
    const yMove = targetY * ease
    // balanço lateral tipo folha caindo
    const sway = Math.sin(t * swaySpeed * Math.PI * 2) * swayAmount * (1 - t * 0.5)
    const xMove = drift * t + sway
    const rotate = Math.sin(t * swaySpeed * Math.PI) * 30
    const opacity = t < 0.75 ? 1 : 1 - (t - 0.75) / 0.25

    el.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg) scale(${1 - t * 0.2})`
    el.style.opacity = opacity

    if (t < 1) {
      requestAnimationFrame(animate)
    } else {
      el.remove()
    }
  }

  requestAnimationFrame(animate)
}
