import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

const port = Number(process.env.PORT || 5000);

await connectToDatabase();

const server = app.listen(port, () => {
  console.log(`API portfolio lancée sur http://localhost:${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Le port ${port} est déjà utilisé. Fermez l'autre serveur Node ou changez PORT dans backend/.env.`
    );
    process.exit(1);
  }

  throw error;
});
