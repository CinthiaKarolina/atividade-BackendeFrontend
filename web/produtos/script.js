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
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Apagar</button>
      </div>
    `).join('')

  } catch (error) {
    console.error('Erro:', error)
    container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar produtos.</p>'
  }
}

// Attach deleteProduct to window object to make it accessible to inline onclick handlers
window.deleteProduct = async function (id) {
  if (confirm('Tem certeza que deseja apagar este produto?')) {
    try {
      const response = await fetch(`http://localhost:3333/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Produto apagado com sucesso!')
        loadProducts() // Reload the list
      } else {
        const data = await response.json()
        alert(`Erro: ${data.error || 'Falha ao apagar produto'}`)
      }
    } catch (error) {
      console.error('Erro ao apagar produto:', error)
      alert('Erro de conexão ao tentar apagar o produto.')
    }
  }
}

loadProducts()
