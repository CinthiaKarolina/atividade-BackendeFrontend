const themeToggle = document.getElementById('theme-toggle')
const body = document.body

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme')
if (currentTheme) {
    body.classList.add(currentTheme)
    updateButtonText()
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')

    const theme = body.classList.contains('dark-mode') ? 'dark-mode' : ''
    localStorage.setItem('theme', theme)
    updateButtonText()
})

function updateButtonText() {
    const isDark = body.classList.contains('dark-mode')
    themeToggle.textContent = isDark ? 'Modo Claro' : 'Modo Escuro'
}
