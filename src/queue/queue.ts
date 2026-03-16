import { Queue } from "bullmq";

export const webhookQueue = new Queue("webhook-jobs", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});
