import type { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const getCoursesRoute: FastifyPluginAsync = async (server) => {
  server.withTypeProvider<ZodTypeProvider>().get("/courses", async (request, reply) => {
    const result = await db
      .select({
        id: courses.id,
        title: courses.title,
      })
      .from(courses);

    return reply.send({ courses: result });
  });
};
