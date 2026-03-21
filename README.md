# Webhook-Driven Task Processing Pipeline

A simplified event-driven automation service inspired by Zapier.

## Features

- Pipeline CRUD API
- Webhook ingestion endpoint
- Redis-backed job queue using BullMQ
- Background worker processing
- Three processing actions:
  - `add_timestamp`
  - `uppercase`
  - `filter_event`
- Subscriber delivery via HTTP POST
- Retry logic for failed deliveries
- Jobs status API
- Docker Compose setup
- GitHub Actions CI

## Architecture

1. A client creates a pipeline.
2. A webhook is sent to /webhooks/:pipelineId.
3. The API stores the event as a queued job in Redis.
4. A worker consumes the job asynchronously.
5. The worker loads the pipeline from PostgreSQL.
6. The configured processing action is applied.
7. The processed payload is delivered to subscriber URLs.
8. Failed deliveries are retried automatically.

## Tech Stack

- TypeScript
- Express
- PostgreSQL
- Redis
- BullMQ
- Docker Compose
- GitHub Actions

## Run locally

```bash
npm install
npm run dev
npx ts-node src/worker/worker.ts
```
