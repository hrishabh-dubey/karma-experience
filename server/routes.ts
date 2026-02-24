import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.feedback.list.path, async (req, res) => {
    try {
      const allFeedback = await storage.getFeedback();
      res.status(200).json(allFeedback);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error("[GET /api/feedback] Error:", errMsg);
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.post(api.feedback.create.path, async (req, res) => {
    try {
      const input = api.feedback.create.input.parse(req.body);
      const newFeedback = await storage.createFeedback(input);
      res.status(201).json(newFeedback);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("[POST /api/feedback] Error:", errMsg);
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  });

  return httpServer;
}
