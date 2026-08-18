import {
  randomUUID
} from 'crypto';

export class IdHelper {

  /**
   * Creates a unique correlation ID
   * for each test execution.
   *
   * Example:
   * 550e8400-e29b-41d4-a716-446655440000
   */
  static createCorrelationId():
    string {

    return randomUUID();
  }


  /**
   * Creates a shorter ID.
   *
   * Useful for:
   * test data,
   * employee names,
   * log references, etc.
   *
   * Example:
   * a81f29bc
   */
  static createShortId():
    string {

    return randomUUID()
      .replace(/-/g, '')
      .substring(0, 8);
  }
}