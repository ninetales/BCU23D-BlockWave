import path from 'path';
import { fileURLToPath } from 'url';
import Blockchain from './models/Blockchain.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

export const blockchain = new Blockchain();