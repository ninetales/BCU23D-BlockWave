import fs from 'fs';
import { writeFile, readFile, appendFile } from 'fs/promises';
import path from 'path';

export const writeToFile = async (folderName, fileName, data) => {
    const filePath = path.join(__appdir, folderName, fileName);
    let chain;
    try {
        const chainData = await readFile(filePath, 'utf-8');
        chain = JSON.parse(chainData);
        const temp = [...chain, data];
        await writeFile(filePath, JSON.stringify(temp));
    } catch (error) {
        if (error.code === 'ENOENT') {
            await appendFile(filePath, `${data}`);
        } else {
            throw new Error(error);
        }
    }
}

export const readFromFile = async (folderName, fileName) => {
    const filePath = path.join(__appdir, folderName, fileName);
    try {
        const chainData = await readFile(filePath, 'utf-8');
        return JSON.parse(chainData);
    } catch (error) {
        throw new Error(error);
    }
}