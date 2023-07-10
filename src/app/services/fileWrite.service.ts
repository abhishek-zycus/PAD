import { Injectable } from '@angular/core';
import { writeFile } from 'fs';
import user from '../../data/user';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  writeFiles(data: any): void {
    const prevData = user;
    prevData.push(data);
    const filename = '../../data/user.ts';

    writeFile(filename, data, (err) => {
      if (err) {
        console.error('Error occurred while writing file:', err);
      } else {
        console.log('File write operation successful');
      }
    });
  }
}
