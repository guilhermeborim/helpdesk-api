import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function callServiceRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post(
    "/call_service",
    { onRequest: [verifyUserRole("TECNICO")] },
    register
  );
}
