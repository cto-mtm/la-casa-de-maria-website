import { z } from "zod";

export interface FormConfig {
  schema: z.ZodObject<z.ZodRawShape>;
  notifyEmail: string;
  subject: string;
  confirmationSubject: string;
  requiredFields: string[];
  optionalFields: string[];
}

const formConfigs: Record<string, FormConfig> = {
  "contact": {
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().min(1),
    }),
    requiredFields: ["name", "email", "message"],
    optionalFields: ["phone"],
    notifyEmail: "lacasademaria@yahoo.com",
    subject: "New Contact Form Submission",
    confirmationSubject: "We received your message",
  },
  // Add more form types here (e.g., "request-demo", "newsletter")
  // following the same shape.
};

export default formConfigs;
