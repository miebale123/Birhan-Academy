export function randomCol() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function randomVec(max) {
  const dir = Math.random() * Math.PI * 2
  const spd = Math.random() * max
  return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd }
}

export function setSize(canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight * 0.5
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight * 0.5}px`

  const width = window.innerWidth
  const height = window.innerHeight * 0.5

  return { width, height }
}
