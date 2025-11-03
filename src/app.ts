import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { z, ZodError } from "zod";
import { env } from "./env";
import { callsRoutes } from "./http/controllers/call/routes";
import { callServiceRoutes } from "./http/controllers/callService/routes";
import { servicesRoutes } from "./http/controllers/services/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyCors);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d",
  },
});

app.register(usersRoutes);
app.register(servicesRoutes);
app.register(callsRoutes);
app.register(callServiceRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
