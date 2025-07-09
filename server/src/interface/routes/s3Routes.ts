// src/interface/routes/s3Routes.ts
import express from "express";
import { S3Controller } from "../controller/S3Controller"; // adjust path as needed

const router = express.Router();
const s3Controller = new S3Controller();


router.post("/s3/generate-presigned-url", async (req, res, next) => {
  try {
    await s3Controller.generatePresignedUrl(req, res);
  } catch (err) {
    next(err); // pass error to Express error handler
  }
});

export { router as s3Router };
