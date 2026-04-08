// Sons sintéticos frescurentos com Web Audio API — zero arquivos externos

let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function play(freq, type, duration, vol = 0.15) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime)
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

// Click genérico — "toc" agudo e curtinho
export function sfxClick() {
  play(800, 'sine', 0.08, 0.12)
}

// Botão principal — "plim" satisfatório
export function sfxPrimary() {
  play(660, 'sine', 0.1, 0.12)
  setTimeout(() => play(880, 'sine', 0.12, 0.1), 60)
}

// Gerar paleta — fanfarra de 3 notas
export function sfxGenerate() {
  play(523, 'triangle', 0.15, 0.13)
  setTimeout(() => play(659, 'triangle', 0.15, 0.13), 100)
  setTimeout(() => play(784, 'triangle', 0.25, 0.15), 200)
}

// Copiar — "snap" rápido
export function sfxCopy() {
  play(1200, 'square', 0.04, 0.08)
  setTimeout(() => play(1600, 'square', 0.05, 0.06), 30)
}

// Checkbox toggle — "tick"
export function sfxCheck() {
  play(1000, 'sine', 0.06, 0.1)
}

// Uncheck — "tock" mais grave
export function sfxUncheck() {
  play(600, 'sine', 0.06, 0.1)
}

// Adicionar cor — "bloop" suave
export function sfxAdd() {
  play(400, 'sine', 0.12, 0.1)
  setTimeout(() => play(600, 'sine', 0.1, 0.08), 70)
}

// Remover cor — "whomp" descendente
export function sfxRemove() {
  play(500, 'sine', 0.1, 0.1)
  setTimeout(() => play(300, 'sine', 0.15, 0.08), 60)
}

// Copiar todas — fanfarra grande
export function sfxCopyAll() {
  play(523, 'sine', 0.1, 0.1)
  setTimeout(() => play(659, 'sine', 0.1, 0.1), 80)
  setTimeout(() => play(784, 'sine', 0.1, 0.1), 160)
  setTimeout(() => play(1047, 'triangle', 0.3, 0.12), 240)
}

// Erro — "bip bip" chato
export function sfxError() {
  play(200, 'square', 0.12, 0.1)
  setTimeout(() => play(200, 'square', 0.12, 0.1), 180)
}

// Hover nos cards — "tink" bem sutil
export function sfxHover() {
  play(1400, 'sine', 0.03, 0.04)
}

// Select all — cascata rápida
export function sfxSelectAll() {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => play(800 + i * 150, 'sine', 0.05, 0.07), i * 40)
  }
}
