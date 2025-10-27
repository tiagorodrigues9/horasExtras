import Usuario from "../models/Usuario.js";

export const atualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    // Para imagem você pode implementar upload depois
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nome },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
