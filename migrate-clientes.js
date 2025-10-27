import mongoose from "mongoose";
import dotenv from "dotenv";
import Cliente from "./models/Cliente.js";
import Usuario from "./models/Usuario.js";

dotenv.config();

async function migrateClientes() {
  try {
    const dbUser = process.env.MONGO_USER;
    const dbPassword = process.env.MONGO_PASS;
    const dbName = process.env.MONGO_DB;

    const MONGO_URI = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}@cluster0.vbirz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    console.log("🔗 Conectando ao MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB Atlas");

    // Buscar todos os clientes sem dono
    const clientesSemDono = await Cliente.find({ dono: { $exists: false } });
    console.log(`📋 Clientes sem dono encontrados: ${clientesSemDono.length}`);

    if (clientesSemDono.length > 0) {
      // Pegar o primeiro usuário como dono padrão (ou você pode escolher outro critério)
      const primeiroUsuario = await Usuario.findOne();
      
      if (!primeiroUsuario) {
        console.log("❌ Nenhum usuário encontrado no banco");
        return;
      }

      console.log(`👤 Usando usuário padrão: ${primeiroUsuario.nome} (${primeiroUsuario._id})`);

      // Atualizar todos os clientes sem dono
      await Cliente.updateMany(
        { dono: { $exists: false } },
        { dono: primeiroUsuario._id }
      );

      console.log(`✅ ${clientesSemDono.length} clientes atualizados com sucesso`);
    } else {
      console.log("✅ Todos os clientes já têm dono");
    }

    await mongoose.disconnect();
    console.log("👋 Desconectado do MongoDB");
  } catch (err) {
    console.error("❌ Erro:", err);
    process.exit(1);
  }
}

migrateClientes();

