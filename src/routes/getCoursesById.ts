import type { FastifyPluginAsync } from "fastify";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";

export const getCoursesByIdRoute: FastifyPluginAsync = async (server) => {
  server.get("/courses/:id", {
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
      tags: ['Courses'],
      summary: 'Get courses by id',
      response: {
        200: z.object({
          course: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string().nullable(),
          }),
        }).describe('Course searched by id'),
        404: z.object({
          error: z.string(),
        }).describe('Course not found'),
      },
      description: 'That route is used to search a course by id from database',
    },
  }, async (request, reply) => {
    // Validação manual dos parâmetros
    const paramsSchema = z.object({ id: z.string().uuid() });
    const parseResult = paramsSchema.safeParse(request.params);

    if (!parseResult.success) {
      return reply.status(404).send({ error: "Invalid ID format" });
    }

    const { id } = parseResult.data;

    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id));

    if (result.length > 0) {
      return { course: result[0] };
    }

    return reply.status(404).send({ error: "Course not found" });
  });
};