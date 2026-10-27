interface RecaptchaResult {
  success: boolean;
  score?: number;
  error?: string;
}

const MIN_SCORE = 0.5;

export async function verifyRecaptcha(
  token: string,
  secretKey: string
): Promise<RecaptchaResult> {
  // Bypass in emulator
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: "No reCAPTCHA token provided" };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: secretKey, response: token }),
      }
    );

    const data = await response.json();

    if (!data.success || (data.score !== undefined && data.score < MIN_SCORE)) {
      return {
        success: false,
        score: data.score,
        error: `reCAPTCHA failed (score: ${data.score ?? "N/A"})`,
      };
    }

    return { success: true, score: data.score };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: `reCAPTCHA verification error: ${message}` };
  }
}
