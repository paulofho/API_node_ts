import type { FastifyPluginAsync } from "fastify";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { string } from "zod";
import { z, uuid } from "zod";

export const getCoursesRoute: FastifyPluginAsync = async (server) => {
  server.get("/courses", {
    schema: {
      tags: ['Courses'],
      summary: 'Get all courses',
      response: {
        200: z.array(z.object({
          id: uuid(),
          title: string(),
        }),
        ),
      },
      description: 'That route is used to get all courses from database',
  }
},
  async (request, reply) => {
    const result = await db
      .select({
        id: courses.id,
        title: courses.title,
      })
      .from(courses);

    return reply.send({ courses: result });
  });
};
