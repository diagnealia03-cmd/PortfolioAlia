import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectToDatabase = async ({ required = false } = {}) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const message = "MONGODB_URI est absent. L'API démarre avec les données de secours.";
    if (required) {
      throw new Error(message);
    }
    console.warn(message);
    return false;
  }

  if (uri.includes("REMPLACE_")) {
    const message =
      "MONGODB_URI contient encore des valeurs à remplacer. Collez votre vraie URI MongoDB Atlas.";
    if (required) {
      throw new Error(message);
    }
    console.warn(message);
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    console.log(uri.startsWith("mongodb+srv://") ? "MongoDB Atlas connecté" : "MongoDB connecté");
    return true;
  } catch (error) {
    if (required) {
      throw error;
    }
    console.warn("Connexion MongoDB impossible. L'API utilisera les données de secours.");
    console.warn(error.message);
    return false;
  }
};

export const isDatabaseReady = () => mongoose.connection.readyState === 1;
