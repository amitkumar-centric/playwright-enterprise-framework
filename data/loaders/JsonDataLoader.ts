import fs from 'fs';
import path from 'path';

export class JsonDataLoader {

  static load<T>(
    filePath: string
  ): T {

    const absolutePath =
      path.resolve(filePath);

    const fileContent =
      fs.readFileSync(
        absolutePath,
        'utf-8'
      );

    return JSON.parse(
      fileContent
    ) as T;
  }
}