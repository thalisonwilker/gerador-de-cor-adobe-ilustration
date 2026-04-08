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

// Musiquinha romântica 8-bit 💕
// Melodia inspirada em "Can't Help Falling in Love" estilo chiptune
let romanceTimeout = null

export function sfxRomance() {
  // Evita sobrepor se já estiver tocando
  if (romanceTimeout) return
  const c = getCtx()
  const bpm = 140
  const beat = 60 / bpm

  // Notas: C D E F G A B em várias oitavas
  const NOTE = {
    C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, B4: 494,
    C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880,
    G3: 196, C3: 131, F3: 175, A3: 220, E3: 165,
  }

  // Melodia principal (square wave = 8-bit)
  const melody = [
    [NOTE.E4, 1],  [NOTE.G4, 0.5], [NOTE.A4, 0.5],
    [NOTE.B4, 1.5],[NOTE.A4, 0.5],  [NOTE.G4, 1],
    [NOTE.E4, 1],  [NOTE.G4, 0.5], [NOTE.A4, 0.5],
    [NOTE.G4, 1.5],[NOTE.F4, 0.5],  [NOTE.E4, 1],
    [NOTE.D4, 0.5],[NOTE.E4, 0.5], [NOTE.F4, 1],
    [NOTE.E4, 0.5],[NOTE.D4, 0.5], [NOTE.C4, 1.5],
    [null, 0.5],
    [NOTE.E4, 1],  [NOTE.G4, 0.5], [NOTE.A4, 0.5],
    [NOTE.B4, 1.5],[NOTE.C5, 0.5],  [NOTE.B4, 1],
    [NOTE.A4, 0.5],[NOTE.G4, 0.5], [NOTE.A4, 1],
    [NOTE.G4, 1],  [NOTE.E4, 1],   [NOTE.C5, 2],
  ]

  // Baixo acompanhamento (triangle = grave suave)
  const bass = [
    [NOTE.C3, 2], [NOTE.G3, 2], [NOTE.A3, 2], [NOTE.E3, 2],
    [NOTE.F3, 2], [NOTE.C3, 2], [NOTE.G3, 2], [NOTE.C3, 2],
    [NOTE.C3, 2], [NOTE.G3, 2], [NOTE.A3, 2], [NOTE.E3, 2],
    [NOTE.F3, 2], [NOTE.G3, 2], [NOTE.C3, 4],
  ]

  function playNote(freq, type, startTime, dur, vol) {
    if (!freq) return
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, startTime)
    gain.gain.setValueAtTime(vol, startTime)
    gain.gain.setValueAtTime(vol, startTime + dur * 0.7)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur * 0.95)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(startTime)
    osc.stop(startTime + dur)
  }

  const now = c.currentTime + 0.05
  let t = 0

  // Toca melodia
  for (const [freq, beats] of melody) {
    const dur = beats * beat
    playNote(freq, 'square', now + t, dur * 0.9, 0.07)
    t += dur
  }

  const totalDuration = t

  // Toca baixo
  let tb = 0
  for (const [freq, beats] of bass) {
    const dur = beats * beat
    if (tb < totalDuration) {
      playNote(freq, 'triangle', now + tb, dur * 0.85, 0.06)
    }
    tb += dur
  }

  // Marca como tocando e limpa depois
  romanceTimeout = setTimeout(() => {
    romanceTimeout = null
  }, totalDuration * 1000 + 200)
}
