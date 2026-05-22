import Message from "../models/Message.js";
import { isDatabaseReady } from "../config/db.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createMessage = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "MongoDB n'est pas connecté. Configurez MONGODB_URI pour enregistrer les messages."
      });
    }

    const payload = {
      name: String(req.body.name || "").trim(),
      email: String(req.body.email || "").trim().toLowerCase(),
      subject: String(req.body.subject || "").trim(),
      message: String(req.body.message || "").trim()
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    if (!emailPattern.test(payload.email)) {
      return res.status(400).json({ message: "Adresse email invalide." });
    }

    if (payload.message.length < 10) {
      return res.status(400).json({ message: "Le message doit contenir au moins 10 caractères." });
    }

    const message = await Message.create(payload);

    return res.status(201).json({
      message: "Message envoyé avec succès.",
      id: message._id
    });
  } catch (error) {
    next(error);
  }
};
