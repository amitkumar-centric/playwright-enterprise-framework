import fs from 'fs';
import path from 'path';

import {
  parse
} from 'csv-parse/sync';


export class CsvDataLoader {

  static load<T>(
    filePath: string
  ): T[] {

    const absolutePath =
      path.resolve(filePath);

    const fileContent =
      fs.readFileSync(
        absolutePath,
        'utf-8'
      );

    return parse(
      fileContent,
      {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }
    ) as T[];
  }
}