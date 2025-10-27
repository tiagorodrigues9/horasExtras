import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const dbUser = process.env.MONGO_USER;
  const dbPassword = process.env.MONGO_PASS;
  const dbName = process.env.MONGO_DB;

  const MONGO_URI = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}@cluster0.vbirz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

export default connectDB;
