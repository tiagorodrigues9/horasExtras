// Middleware de tratamento de erro global
export const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ 
      error: 'Dados inválidos', 
      details: errors 
    });
  }

  // Erro de duplicação do Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ 
      error: `${field} já existe` 
    });
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      error: 'Token inválido' 
    });
  }

  // Erro de token expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      error: 'Token expirado' 
    });
  }

  // Erro padrão
  res.status(500).json({ 
    error: 'Erro interno do servidor' 
  });
};

// Middleware para rotas não encontradas
export const notFound = (req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada' 
  });
};
