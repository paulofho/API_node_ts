import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";



export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    // GET
server.get("/courses", async (request, reply) => {
  const result = await db.select({
    id: courses.id,
    title: courses.title,
  }).from(courses);

  return reply.send({ courses: result }); // Sempre retorne po objeto da rota
});
}