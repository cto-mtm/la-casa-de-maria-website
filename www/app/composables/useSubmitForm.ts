/**
 * Composable for submitting forms to the Cloud Function.
 *
 * Usage:
 *   const { submit, loading, error } = useSubmitForm()
 *   const result = await submit('contact', { name: '...', email: '...', message: '...' })
 */
export function useSubmitForm() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const error = ref<string | undefined>(undefined)

  async function submit(
    formType: string,
    data: Record<string, unknown>,
    recaptchaToken?: string
  ): Promise<{ success: boolean; error?: string }> {
    loading.value = true
    error.value = undefined

    const url = config.public.submitFormUrl || 'https://us-central1-REPLACE_ME.cloudfunctions.net/submitForm'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, data, recaptchaToken })
      })

      const result = await response.json()

      if (!response.ok) {
        error.value = result.error || `Request failed with status ${response.status}`
        return { success: false, error: error.value }
      }

      return { success: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error'
      error.value = message
      return { success: false, error: message }
    } finally {
      loading.value = false
    }
  }

  return { submit, loading, error }
}
