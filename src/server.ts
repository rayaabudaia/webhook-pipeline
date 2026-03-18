import express from "express";
import pipelineRoutes from "./api/pipelines";
import webhookRoutes from "./webhook/webhook";
import jobsRoutes from "./api/jobs";
const app = express();

app.use(express.json());

app.use("/pipelines", pipelineRoutes);
app.use("/webhooks", webhookRoutes);
app.use("/jobs", jobsRoutes);
app.get("/", (req, res) => {
  res.send("Webhook Pipeline Service Running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
