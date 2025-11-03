import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { clients } from "./clients";
import { profile } from "./profile";
import { register } from "./register";
import { tec } from "./tec";

export async function usersRoutes(app: FastifyInstance) {
  // app.addHook("onRequest", verifyJWT); // Colocar essa linha nas rotas que só podem ser acessadas com o usuário autenticado, fara com que as rotas abaixo dela precisem estar autenticadas
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJWT] }, profile); // Esse request faz com que apenas essa rota precisa estar autenticada para ser acessada
  app.get(
    "/clients",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    clients
  );
  app.get("/tech", { onRequest: [verifyJWT, verifyUserRole("ADMIN")] }, tec);
  // app.post("/users", { onRequest: [verifyUserRole("ADMIN")] }, register); // Esse request verifica o role do usuario e só ADMIN pode acessar essa rota
}
