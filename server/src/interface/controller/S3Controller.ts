import { Request, Response } from "express";
import { generatePresignedUrl } from "../../application/services/s3Service";

export class S3Controller {
  async generatePresignedUrl(req: Request, res: Response) {
    try {
      const { fileType, folder } = req.body;

      if (!fileType || !folder) {
        return res.status(400).json({ error: "fileType and folder are required" });
      }

      const result = await generatePresignedUrl(fileType, folder);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      res.status(500).json({ error: "Failed to generate signed URL" });
    }
  }
}
