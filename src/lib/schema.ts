import { z } from "zod";

export const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be less than 80 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed"),
  email: z.string().email("Invalid email"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  services: z
    .array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "Select at least one service"),
  budget: z
    .number()
    .int("Must be an integer")
    .min(100, "Minimum budget is 100")
    .max(1_000_000, "Maximum budget is 1,000_000")
    .optional()
    .or(z.literal(NaN)),
  startDate: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().toDateString()),
    { message: "Start date must be today or later" }
  ),
  acceptTerms: z.literal(true, { message: "You Must Accept Terms" }),
});

export type FormData = z.infer<typeof schema>;

