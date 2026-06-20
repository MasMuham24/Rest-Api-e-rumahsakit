const container = document.createElement('div')
container.className = 'fixed top-4 right-4 z-[100] flex flex-col gap-2'
document.body.appendChild(container)

function show(message, type) {
  const colors = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  }
  const el = document.createElement('div')
  el.className = `rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${colors[type] || colors.info}`
  el.textContent = message
  container.appendChild(el)
  setTimeout(() => {
    el.style.opacity = '0'
    el.style.transform = 'translateX(100%)'
    setTimeout(() => el.remove(), 300)
  }, 3000)
}

export const toast = {
  success: (msg) => show(msg, 'success'),
  error: (msg) => show(msg, 'error'),
  info: (msg) => show(msg, 'info'),
}
