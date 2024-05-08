import fs from 'fs';
// import { __appdir } from '../global.mjs';
import Block from './Block.mjs';
import { FileHandler } from '../utilities/FileHandler.mjs';

const folder = 'data';
const file = `blockchain-${process.argv[2]}.json`;
const fileHandler = new FileHandler(folder, file);

export default class Blockchain {

    constructor() {
        console.log('start blockchain');
        // Creating the genesis block...
        this.createBlock(Date.now(), '0', '0', []);
    }

    getChain() {
        const chainData = fileHandler.readFromFile();
        console.log('GETCHAIN()', chainData);
        return chainData ? chainData : [];
    }

    createBlock(timeStamp, previousBlockHash, currentBlockHash, data, difficulty) {
        const block = new Block(
            timeStamp,
            this.getChain().length + 1,
            previousBlockHash,
            currentBlockHash,
            data,
            difficulty
        );

        fileHandler.writeToFile(JSON.stringify(block));
    }

}
