import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token de acesso necessário" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    req.usuario = user; // ⚡ correto agora
    next();
  });
};
