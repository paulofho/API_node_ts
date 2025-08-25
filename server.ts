import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";

// Rotas
import { createCourseRoute } from "./src/routes/createCourse.ts";
import { getCoursesRoute } from "./src/routes/getCourses.ts";
import { getCoursesByIdRoute } from "./src/routes/getCoursesById.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider(); // ✅ aplica o TypeProvider original

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Curso de Node.js",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Registrando rotas
server.register(createCourseRoute);
server.register(getCoursesByIdRoute);
server.register(getCoursesRoute);

server.listen({ port: 1313 }).then(() => {
  console.log("HTTP server running on port 1313!");
});

