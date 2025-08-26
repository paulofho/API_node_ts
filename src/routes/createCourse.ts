import type { FastifyPluginAsync } from "fastify";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { string, z } from "zod";

export const createCourseRoute: FastifyPluginAsync = async (server) => {
  server.post("/courses", {
    schema: {
      body: z.object({
        title: z.string().min(5, "O título deve ter pelo menos 5 caracteres!"),
      }),
    },
  }, async (request, reply) => {
    const { courseTitle } = request.body.title

    const result = await db
      .insert(courses)
      .values({ title:courseTitle })
      .returning();

    return reply.status(201).send({ courseId: result[0].id });
  });
};
