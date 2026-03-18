import { Router } from "express";
import { Queue } from "bullmq";

const router = Router();

const queue = new Queue("webhook-jobs", {
  connection: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT || 6379)
  }
});

router.get("/", async (req, res) => {
  const jobs = await queue.getJobs(["waiting", "active", "completed", "failed"]);

  const result = jobs.map((job) => ({
    id: job.id,
    name: job.name,
    data: job.data,
    attemptsMade: job.attemptsMade
  }));

  res.json(result);
});

export default router;
