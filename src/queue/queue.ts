import { Queue } from "bullmq";

export const webhookQueue = new Queue("webhook-jobs", {
  connection: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT || 6379)
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000
    }
  }
});
