import fastify from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import scalarAPIReference from "@scalar/fastify-api-reference";

// Rotas
import { createCourseRoute } from "./routes/createCourse.ts";
import { getCoursesRoute } from "./routes/getCourses.ts";
import { getCoursesByIdRoute } from "./routes/getCoursesById.ts";

export const server = fastify({
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

//server.register(fastifySwaggerUi, {
  //routePrefix: "/docs",
//});
server.register(scalarAPIReference, {
  routePrefix: '/docs',
})

// Registrando rotas server.register(createCourseRoute);


server.register(createCourseRoute);
server.register(getCoursesByIdRoute);
server.register(getCoursesRoute);


//export { server };