import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { get } from "./get";
import { getByIdTech } from "./get-id-tech";
import { getByIdUser } from "./get-id-user";
import { register } from "./register";

export async function callsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/calls", { onRequest: [verifyUserRole("CLIENTE")] }, register);
  app.get("/calls", get);
  app.get(
    "/calls/:id",
    { onRequest: [verifyUserRole("CLIENTE")] },
    getByIdUser
  );
  app.get(
    "/calls/tech/:id",
    { onRequest: [verifyUserRole("TECNICO")] },
    getByIdTech
  );
}
