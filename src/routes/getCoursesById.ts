import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";
import { eq } from "drizzle-orm";


export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
// GET ID ESPECIFICO
server.get("/courses/:id", {
    schema: {
    params: z.object({
      id: z.uuid(),
    })
  }
}, async (request, reply) => {
  // sempre colocar 2 pontos para indicar parametro de rota
  const courseId = request.params.id;

  const result = await db
  .select()
  .from(courses)
  .where(eq(courses.id, courseId));

  if (result.length > 0) {
    return { course: result[0] };


  return reply.status(404).send();
}});
}