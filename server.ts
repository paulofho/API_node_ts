import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  { id: "1", title: "Curso node.js" },
  { id: "2", title: "Curso paulo.js" },
  { id: "3", title: "Curso allison.js" },
];

// Criando as rotas
// GET
server.get("/courses", () => {
  return { courses }; // Sempre retorne po objeto da rota
});

// POST
server.post("/courses", (request, reply) => {
  type Body = {
    title: string;
  };
  const body = request.body as Body;
  const courseTitle = body.title;

  const courseId = crypto.randomUUID();

  if (!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório!" }); // como o body é opcional, estamos validando aqui
  }

  courses.push({ id: courseId, title: courseTitle });

  return reply.status(201).send({ courseId }); // Sempre retorne po objeto da rota
});

// GET ID ESPECIFICO
server.get("/courses/:id", (request, reply) => {
  // sempre colocar 2 pontos para indicar parametro de rota
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return reply.status(404).send();
});

// Listen
server.listen({ port: 1313 }).then(() => {
  console.log("HTTP server running!");
});
