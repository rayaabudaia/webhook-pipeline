import { Router } from "express";
import { webhookQueue } from "../queue/queue";

const router = Router();

router.post("/:pipelineId", async (req, res) => {

  const pipelineId = req.params.pipelineId;
  const payload = req.body;

  await webhookQueue.add("processWebhook", {
    pipelineId,
    payload
  });

  res.json({
    message: "Webhook received and queued"
  });

});

export default router;
