import '../script.js' // Import shared theme logic

const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const product = Object.fromEntries(formData)

    // Convert price to number
    product.preco = Number(product.preco)

    try {
        const response = await fetch('http://localhost:3333/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await response.json()

        if (response.ok) {
            alert('Produto cadastrado com sucesso!')
            window.location.href = '../produtos/index.html'
        } else {
            alert(`Erro: ${data.error}`)
        }
    } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao conectar com o servidor.')
    }
})
