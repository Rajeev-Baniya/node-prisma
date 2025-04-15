import { z } from 'zod';

export const defaultPaginationSchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  currentPage: z.coerce.number().optional(),
});

export const defaultQuerySchema = defaultPaginationSchema.extend({
  search: z.string().optional(),
});

export type TDefaultQuery = z.infer<typeof defaultQuerySchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAny = any;
