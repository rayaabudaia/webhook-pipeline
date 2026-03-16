import express from "express";
import pipelineRoutes from "./api/pipelines";
import webhookRoutes from "./webhook/webhook";
const app = express();

app.use(express.json());

app.use("/pipelines", pipelineRoutes);
app.use("/webhooks", webhookRoutes);
app.get("/", (req, res) => {
  res.send("Webhook Pipeline Service Running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
