import {
  existsSync,
  readFileSync
} from 'fs';

export class FileHelper {

  static exists(
    filePath: string
  ): boolean {

    return existsSync(
      filePath
    );
  }

  static readText(
    filePath: string
  ): string {

    if (
      !existsSync(filePath)
    ) {
      throw new Error(
        `File not found: ${filePath}`
      );
    }

    return readFileSync(
      filePath,
      'utf-8'
    );
  }
}