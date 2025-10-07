const express = require('express');
const router = express.Router();

// Mock de banco de dados
let projetos = [
  { id: 1, nome: "Projeto Água Limpa", descricao: "Levar água potável para comunidades carentes.", meta: 5000, arrecadado: 1200 }
];

//  Criar um novo projeto (Create)
router.post('/', (req, res) => {
  const novoProjeto = {
    id: projetos.length + 1,
    nome: req.body.nome,
    descricao: req.body.descricao,
    meta: req.body.meta,
    arrecadado: 0
  };
  projetos.push(novoProjeto);
  res.status(201).json({ message: "Projeto criado com sucesso!", projeto: novoProjeto });
});

//  Ler todos os projetos (Read)
router.get('/', (req, res) => {
  res.json(projetos);
});

//  Ler um projeto específico (Read)
router.get('/:id', (req, res) => {
  const projeto = projetos.find(p => p.id === parseInt(req.params.id));
  if (!projeto) return res.status(404).json({ message: "Projeto não encontrado." });
  res.json(projeto);
});

//  Atualizar informações de um projeto (Update)
router.put('/:id', (req, res) => {
  const projeto = projetos.find(p => p.id === parseInt(req.params.id));
  if (!projeto) return res.status(404).json({ message: "Projeto não encontrado." });

  projeto.nome = req.body.nome || projeto.nome;
  projeto.descricao = req.body.descricao || projeto.descricao;
  projeto.meta = req.body.meta || projeto.meta;

  res.json({ message: "Projeto atualizado com sucesso!", projeto });
});

//  Deletar um projeto (Delete)
router.delete('/:id', (req, res) => {
  const index = projetos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Projeto não encontrado." });

  projetos.splice(index, 1);
  res.json({ message: "Projeto deletado com sucesso!" });
});

//  Fazer uma doação para um projeto
router.post('/:id/doar', (req, res) => {
  const projeto = projetos.find(p => p.id === parseInt(req.params.id));
  if (!projeto) return res.status(404).json({ message: "Projeto não encontrado." });

  const valor = parseFloat(req.body.valor);
  if (!valor || valor <= 0) return res.status(400).json({ message: "Valor inválido para doação." });

  projeto.arrecadado += valor;
  res.json({
    message: `Doação de R$${valor.toFixed(2)} realizada com sucesso!`,projeto});
});

module.exports = router;
