import { Worker } from "bullmq";
import { pool } from "../db/db";
import axios from "axios";
import { addTimestamp, uppercase, filterEvent } from "../actions/actions";

const worker = new Worker(
  "webhook-jobs",
  async (job) => {
    const { pipelineId, payload } = job.data;

    console.log("Processing job for pipeline:", pipelineId);

    const result = await pool.query("SELECT * FROM pipelines WHERE id=$1", [pipelineId]);
    const pipeline = result.rows[0];

    if (!pipeline) {
      console.log("Pipeline not found");
      return;
    }

    console.log("Pipeline:", pipeline.name);
    console.log("Original payload:", payload);

    let processedPayload = payload;

    switch (pipeline.action) {
      case "add_timestamp":
        processedPayload = addTimestamp(payload);
        break;
      case "uppercase":
        processedPayload = uppercase(payload);
        break;
      case "filter_event":
        processedPayload = filterEvent(payload);
        break;
      default:
        console.log("Unknown action:", pipeline.action);
    }

    if (!processedPayload) {
      console.log("Event filtered out");
      return;
    }

    console.log("Processed payload:", processedPayload);

    const subscribers = pipeline.subscribers || [];

    for (const url of subscribers) {
      try {
        console.log("Sending result to:", url);
        await axios.post(url, processedPayload);
        console.log("Delivery successful:", url);
      } catch (error) {
        console.log("Delivery failed:", url);
        throw new Error("Subscriber delivery failed");
      }
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT || 6379)
    }
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});

console.log("Worker started");
