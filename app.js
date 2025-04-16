const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

// Supondo que você tenha um "banco de dados" de usuários em memória
let users = [
    { id: 1, username: 'admin', password: '$2a$10$B6o.OTKq7g7wKhjlkjalkjhfljjhlUop.mFvhkwHbYJ4Q8L6DGeiGi' }  // A senha é "senha123" criptografada
];

// Função para gerar token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'secrectkey', { expiresIn: '1h' });
};

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gerar o token
    const token = generateToken(user.id);
    res.json({ token });
});

// Middleware para proteger rotas
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado!' });
    }

    try {
        const decoded = jwt.verify(token, 'secrectkey');
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};

// Rota protegida
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Conteúdo protegido acessado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
