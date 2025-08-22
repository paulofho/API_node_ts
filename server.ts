import fastify from "fastify";
import { eq } from "drizzle-orm";
// import { db } from "../database/client.ts";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
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
}).withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Curso de Node.js",
      version: "1.0.0",
    }
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Chamando minhas rotas
server.register(createCourseRoute)
server.register(getCoursesByIdRoute)
server.register(getCoursesRoute)


/*
server.patch("/courses/:id", (request, reply) => {
  type Body = {
    id: string;
    title: string;
  };

  const body = request.body as Body;
  const newTitle = body.title;
  const courseId = crypto.randomUUID();

  if (newTitle === title) {
    return console.log("O novo título precisa ser diferente do anterior!");
  }

  courses.push({ id: courseId, title: newTitle });

  return reply.status(201).send({ title });
});*/


// Listen
server.listen({ port: 1313 }).then(() => {
  console.log("HTTP server running!");
});
