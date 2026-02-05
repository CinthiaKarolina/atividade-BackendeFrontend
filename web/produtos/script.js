import '../script.js'

const container = document.getElementById('products-list')

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3333/products')
        const products = await response.json()

        if (products.length === 0) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Nenhum produto cadastrado ainda.</p>'
            return
        }

        container.innerHTML = products.map(product => `
      <div class="product-card">
        <h3>${product.nome}</h3>
        <span class="price">R$ ${product.preco.toFixed(2)}</span>
        <p class="description">${product.descricao}</p>
      </div>
    `).join('')

    } catch (error) {
        console.error('Erro:', error)
        container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar produtos.</p>'
    }
}

loadProducts()
