import { Router } from "express";
import { pool } from "../db/db";

const router = Router();

router.post("/", async (req, res) => {
  const { name, action, subscribers } = req.body;

  const result = await pool.query(
    "INSERT INTO pipelines (name, action, subscribers) VALUES ($1,$2,$3) RETURNING *",
    [name, action, JSON.stringify(subscribers)]
  );

  res.json(result.rows[0]);
});


router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM pipelines");
  res.json(result.rows);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM pipelines WHERE id=$1", [id]);

  res.json({ message: "pipeline deleted" });
});

export default router;
