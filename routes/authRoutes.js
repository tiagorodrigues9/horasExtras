import express from "express";
import { register, login, getMe, updateProfile } from "../controllers/authController.js";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.js"; // ⚡

const router = express.Router();

// Configuração do multer...
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Apenas imagens são permitidas!'), false);
  }
});

router.post("/register", register);
router.post("/login", login);

// ⚡ Aqui adicionamos o middleware para validar token
router.get("/me", authenticateToken, getMe);
router.put("/perfil", authenticateToken, upload.single('foto'), updateProfile);

export default router;
