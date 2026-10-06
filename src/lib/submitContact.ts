export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * Mock submission adapter for the contact form.
 * Simulates network latency and returns a success response.
 */
export async function submitContact(data: ContactFormData): Promise<ContactSubmitResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Basic validation check
  if (!data.fullName || !data.email || !data.message) {
    throw new Error('Please fill in all required fields.');
  }

  // Simulate successful receipt
  return {
    success: true,
    message: `Thank you, ${data.fullName}! Your request for ${
      data.service ? `"${data.service}"` : 'custom solutions'
    } has been received. Our team will contact you within one business day.`,
    timestamp: new Date().toISOString(),
  };
}
