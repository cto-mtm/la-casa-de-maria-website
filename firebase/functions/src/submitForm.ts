import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import { ZodError } from "zod";
import formConfigs from "./models.js";
import { createTransporter, formatFrom } from "./helpers/mailer.js";
import { verifyRecaptcha } from "./helpers/recaptcha.js";
import { buildNotificationEmail } from "./templates/notificationEmail.js";
import { buildConfirmationEmail } from "./templates/confirmationEmail.js";

const GMAIL_USER = defineSecret("GMAIL_USER");
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");
const GMAIL_SENDER = defineSecret("GMAIL_SENDER");
const RECAPTCHA_SECRET_KEY = defineSecret("RECAPTCHA_SECRET_KEY");

// REPLACE_ME — Update these origins for your production domain
const ALLOWED_ORIGINS = [
  "https://example.com",
  "https://www.example.com",
  "http://localhost:3000",
];

export const submitForm = onRequest(
  {
    region: "us-central1",
    maxInstances: 10,
    secrets: [GMAIL_USER, GMAIL_APP_PASSWORD, GMAIL_SENDER, RECAPTCHA_SECRET_KEY],
  },
  async (req, res) => {
    // CORS handling
    const origin = req.headers.origin ?? "";
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.set("Access-Control-Allow-Origin", origin);
    }
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { formType, data, recaptchaToken } = req.body;

      // Validate form type
      const config = formConfigs[formType];
      if (!config) {
        const validTypes = Object.keys(formConfigs).join(", ");
        res.status(400).json({
          error: `Unknown form type: "${formType}". Valid types: ${validTypes}`,
        });
        return;
      }

      // Verify reCAPTCHA
      const recaptchaResult = await verifyRecaptcha(
        recaptchaToken ?? "",
        RECAPTCHA_SECRET_KEY.value()
      );
      if (!recaptchaResult.success) {
        logger.warn("reCAPTCHA failed", { formType, error: recaptchaResult.error });
        res.status(403).json({ error: "reCAPTCHA verification failed" });
        return;
      }

      // Validate data with Zod
      let parsed: Record<string, unknown>;
      try {
        parsed = config.schema.parse(data) as Record<string, unknown>;
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({ error: "Validation failed", details: err.flatten() });
          return;
        }
        throw err;
      }

      // Create email transporter
      const transporter = createTransporter(
        GMAIL_USER.value(),
        GMAIL_APP_PASSWORD.value()
      );
      const from = formatFrom(GMAIL_SENDER.value());

      // Send notification email
      const senderName = String(parsed.name ?? "Unknown").replace(/[\r\n]/g, "");
      await transporter.sendMail({
        from,
        to: config.notifyEmail,
        subject: `${config.subject} — ${senderName}`,
        html: buildNotificationEmail(config, parsed),
      });

      logger.info("Notification email sent", { formType, to: config.notifyEmail });

      // Send confirmation email (if submitter provided email)
      if (parsed.email && typeof parsed.email === "string") {
        await transporter.sendMail({
          from,
          to: parsed.email,
          subject: config.confirmationSubject,
          html: buildConfirmationEmail(config, parsed),
        });
        logger.info("Confirmation email sent", { formType, to: parsed.email });
      }

      res.status(200).json({ success: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal error";
      logger.error("submitForm error", { error: message });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
