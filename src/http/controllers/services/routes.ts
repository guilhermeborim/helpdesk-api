import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { get } from "./get";
import { patch } from "./patch";
import { register } from "./register";

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/services", { onRequest: [verifyUserRole("ADMIN")] }, register);
  app.get("/services", get);
  app.patch("/services/:id", { onRequest: [verifyUserRole("ADMIN")] }, patch);
}
