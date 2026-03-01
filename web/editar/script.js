import '../script.js'

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get the ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('ID do produto não fornecido!');
        window.location.href = '../produtos/index.html';
        return;
    }

    const form = document.getElementById('edit-form');
    const idInput = document.getElementById('produto-id');
    const nomeInput = document.getElementById('nome');
    const precoInput = document.getElementById('preco');
    const descricaoInput = document.getElementById('descricao');

    // 2. Fetch the existing product data and fill the form
    try {
        const response = await fetch(`http://localhost:3333/products/${productId}`);

        if (!response.ok) {
            throw new Error('Falha ao buscar produto');
        }

        const product = await response.json();

        idInput.value = product.id;
        nomeInput.value = product.nome;
        precoInput.value = product.preco;
        descricaoInput.value = product.descricao;

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar os dados do produto.');
        window.location.href = '../produtos/index.html';
    }

    // 3. Handle form submission to update the product
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedData = {
            nome: nomeInput.value,
            preco: parseFloat(precoInput.value),
            descricao: descricaoInput.value
        };

        try {
            const response = await fetch(`http://localhost:3333/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                window.location.href = '../produtos/index.html'; // Redirect to the list
            } else {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error || 'Falha ao atualizar produto'}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão ao tentar atualizar o produto.');
        }
    });
});
