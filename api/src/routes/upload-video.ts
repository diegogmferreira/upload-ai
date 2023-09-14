import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart';
import { prisma } from "../lib/prisma";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fs from "node:fs";

const pump = promisify(pipeline)

export async function uploadVideosRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    }
  })

  app.post('/videos', async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: 'Missing file' })
    }

    const extension = path.extname(data.filename);

    if ('.mp3' !== extension) {
      return reply.status(400).send({ error: 'Invalid input type. Not MP3 file' })
    }

    const filebaseName = path.basename(data.filename, extension);
    const fileUploadName = `${filebaseName}-${randomUUID()}${extension}`;
    const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName);

    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination
      }
    })

    return { video }
  });
}