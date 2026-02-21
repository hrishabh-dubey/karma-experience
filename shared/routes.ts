import { z } from 'zod';
import { insertFeedbackSchema, feedback } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  feedback: {
    list: {
      method: 'GET' as const,
      path: '/api/feedback' as const,
      responses: {
        200: z.array(z.custom<typeof feedback.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/feedback' as const,
      input: insertFeedbackSchema,
      responses: {
        201: z.custom<typeof feedback.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type FeedbackInput = z.infer<typeof api.feedback.create.input>;
export type FeedbackResponse = z.infer<typeof api.feedback.create.responses[201]>;
export type FeedbackListResponse = z.infer<typeof api.feedback.list.responses[200]>;
