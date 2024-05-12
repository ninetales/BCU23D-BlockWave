import { createHash } from '../utilities/cryptoHandler.mjs';
import Block from './Block.mjs';

export default class Blockchain {

    constructor() {
        this.memberNodes = [];
        this.nodeUrl = process.argv[3];
    }

    createBlock(chain, timestamp, prevBlockHash, currentBlockHash, data, difficulty) {
        const block = new Block(
            timestamp,
            chain.length + 1,
            prevBlockHash,
            currentBlockHash,
            data,
            difficulty
        );

        return block;
    }

    hashBlock(timestamp, prevBlockHash, currentBlockData, nonce) {
        const stringToHash = timestamp.toString() + prevBlockHash + JSON.stringify(currentBlockData) + nonce;
        const hash = createHash(stringToHash);
        return hash;
    }

    proofOfWork(timestamp, prevBlockHash, data) {
        const DIFFICULTY_LVL = process.env.DIFFICULTY;
        let nonce = 0;
        let hash = this.hashBlock(timestamp, prevBlockHash, data, nonce);
        let currentTime;

        while (hash.substring(0, DIFFICULTY_LVL) !== '0'.repeat(DIFFICULTY_LVL)) {
            nonce++;
            currentTime = Date.now();
            hash = this.hashBlock(currentTime, prevBlockHash, data, nonce);
        }

        return nonce;
    }

}
