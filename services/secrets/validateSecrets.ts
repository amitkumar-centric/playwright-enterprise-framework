import { secrets } from './index';

export async function validateSecrets(
  requiredSecrets: string[]
): Promise<void> {
  const missingSecrets: string[] = [];

  for (const key of requiredSecrets) {
    try {
      const exists = await secrets.has(key);

      if (!exists) {
        missingSecrets.push(key);
      }
    } catch {
      throw new Error(
        `Unable to validate secret "${key}". ` +
          `Check the configured secret provider and authentication.`
      );
    }
  }

  if (missingSecrets.length > 0) {
    throw new Error(`Missing required secrets: ${missingSecrets.join(', ')}`);
  }
}
