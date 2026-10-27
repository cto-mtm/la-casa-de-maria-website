import { escapeHtml } from "../helpers/escapeHtml.js";
import type { FormConfig } from "../models.js";

export function buildConfirmationEmail(
  config: FormConfig,
  data: Record<string, unknown>
): string {
  const name = escapeHtml(String(data.name ?? "there"));

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#1e293b;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;">✅ ${escapeHtml(config.confirmationSubject)}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${name},</p>
              <p style="margin:0 0 16px;color:#4b5563;font-size:14px;line-height:1.6;">
                Thank you for reaching out! We've received your message and will get back to you as soon as possible.
              </p>
              <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
                If you have any urgent questions in the meantime, feel free to reply to this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">REPLACE_ME — REPLACE_ME_ADDRESS</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
