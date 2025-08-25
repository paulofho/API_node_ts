import type { FastifyPluginAsync } from "fastify";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getCoursesByIdRoute: FastifyPluginAsync = async (server) => {
  server.get("/courses/:id", {
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
  }, async (request, reply) => {
    const { id } = request.params;

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

