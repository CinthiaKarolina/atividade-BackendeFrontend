import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3333

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../web')))

// Database Setup
const db = new sqlite3.Database('produtos.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message)
  } else {
    console.log('Conectado ao banco de dados SQLite.')
    createTable()
  }
})

function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS produtosCinthia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      descricao TEXT NOT NULL
    )
  `
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message)
    } else {
      console.log('Tabela produtosCinthia pronta.')
    }
  })
}

// Routes

// GET /products - List all products (excluding ID)
app.get('/products', (request, response) => {
  const query = 'SELECT id, nome, preco, descricao FROM produtosCinthia'
  db.all(query, [], (err, rows) => {
    if (err) {
      return response.status(500).json({ error: err.message })
    }
    return response.json(rows)
  })
})

// POST /products - Create a new product
app.post('/products', (request, response) => {
  const { nome, preco, descricao } = request.body

  if (!nome || !preco || !descricao) {
    return response.status(400).json({ error: 'Nome, preço e descrição são obrigatórios.' })
  }

  const query = 'INSERT INTO produtosCinthia (nome, preco, descricao) VALUES (?, ?, ?)'
  const params = [nome, preco, descricao]

  db.run(query, params, function (err) {
    if (err) {
      return response.status(500).json({ error: err.message })
    }
    return response.status(201).json({
      message: 'Produto salvo com sucesso!',
      id: this.lastID
    })
  })
})

// DELETE /products/:id - Delete a product by its ID
app.delete('/products/:id', (request, response) => {
  const { id } = request.params

  const query = 'DELETE FROM produtosCinthia WHERE id = ?'
  db.run(query, [id], function (err) {
    if (err) {
      return response.status(500).json({ error: err.message })
    }

    // this.changes contains the number of rows affected by the query
    if (this.changes === 0) {
      return response.status(404).json({ error: 'Produto não encontrado.' })
    }

    return response.json({ message: 'Produto apagado com sucesso!' })
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})