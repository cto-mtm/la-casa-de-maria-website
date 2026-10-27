/**
 * Email Preview Script
 *
 * Renders the notification and confirmation email templates to HTML files
 * for visual review in a browser.
 *
 * Usage: npm run preview:emails
 * Output: firebase/functions/preview/notification.html & confirmation.html
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const previewDir = join(__dirname, '..', 'preview');

// Import compiled templates
const { buildNotificationEmail } = await import('../lib/templates/notificationEmail.js');
const { buildConfirmationEmail } = await import('../lib/templates/confirmationEmail.js');

// Sample data
const sampleConfig = {
  subject: 'New Contact Form Submission',
  confirmationSubject: 'We received your message',
  notifyEmail: 'test@example.com',
  requiredFields: ['name', 'email', 'message'],
  optionalFields: ['phone'],
};

const sampleData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 (555) 123-4567',
  message: 'Hello! I would like to know more about your services. Looking forward to hearing from you.',
};

// Render
mkdirSync(previewDir, { recursive: true });

const notificationHtml = buildNotificationEmail(sampleConfig, sampleData);
writeFileSync(join(previewDir, 'notification.html'), notificationHtml, 'utf-8');

const confirmationHtml = buildConfirmationEmail(sampleConfig, sampleData);
writeFileSync(join(previewDir, 'confirmation.html'), confirmationHtml, 'utf-8');

console.log('✓ Email previews written to:');
console.log(`  → preview/notification.html`);
console.log(`  → preview/confirmation.html`);
