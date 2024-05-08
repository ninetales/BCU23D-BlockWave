import fs from 'fs';
import path from 'path';
// import { __appdir } from '../global.mjs';

export class FileHandler {

    constructor(folderName, fileName) {
        this.filePath = path.join(__appdir, folderName, fileName);
    }

    writeToFile(block) {
        console.log('WRITING TO FILE!');
        try {
            if (fs.existsSync(this.filePath)) {
                const chain = JSON.parse(fs.readFileSync(this.filePath));
                console.log('FILE UPDATED');
            } else {
                // Create file
                fs.appendFileSync(this.filePath, `[${block}]`);
                console.log('FILE CREATED!');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    readFromFile() {
        console.log('READING FROM FILE!');
        try {
            if (fs.existsSync(this.filePath)) {
                return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }

    }
}
