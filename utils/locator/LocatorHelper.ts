import { Locator } from '@playwright/test';

import { Logger } from '../logger/Logger';

import { locatorConfig } from '../../config/locator.config';

export interface LocatorCandidate {
  name: string;

  locator: () => Locator;
}

export class LocatorHelper {
  static async resolve(
    candidates: LocatorCandidate[],
    logger?: Logger
  ): Promise<Locator> {
    if (candidates.length === 0) {
      throw new Error('No locator candidates were provided.');
    }

    /*
     * STEP 1
     * Always try primary locator.
     */

    const primary = candidates[0];

    logger?.info(`Trying primary locator: ${primary.name}`);

    try {
      const primaryLocator = primary.locator();

      const primaryVisible = await primaryLocator.first().isVisible({
        timeout: locatorConfig.fallbackTimeout
      });

      if (primaryVisible) {
        logger?.info(`Primary locator succeeded: ${primary.name}`);

        return primaryLocator.first();
      }
    } catch {
      logger?.warn(`Primary locator failed: ${primary.name}`);
    }

    /*
     * STEP 2
     * Check whether self-healing is enabled.
     */

    if (!locatorConfig.selfHealing) {
      logger?.warn('Self-healing is disabled.');

      throw new Error(
        `Primary locator failed and self-healing is disabled: ${primary.name}`
      );
    }

    logger?.warn('Self-healing enabled. Trying fallback locators.');

    /*
     * STEP 3
     * Try fallback locators.
     */

    const fallbackCandidates = candidates.slice(1);

    for (const candidate of fallbackCandidates) {
      logger?.info(`Trying fallback locator: ${candidate.name}`);

      try {
        const fallbackLocator = candidate.locator();

        const fallbackVisible = await fallbackLocator.first().isVisible({
          timeout: locatorConfig.fallbackTimeout
        });

        if (fallbackVisible) {
          logger?.warn(`SELF-HEALING SUCCESS: ${candidate.name}`);

          return fallbackLocator.first();
        }
      } catch {
        logger?.debug(`Fallback locator failed: ${candidate.name}`);
      }
    }

    /*
     * STEP 4
     * Everything failed.
     */

    throw new Error(
      `Unable to resolve locator. Tried: ${candidates
        .map((candidate) => candidate.name)
        .join(', ')}`
    );
  }
}
