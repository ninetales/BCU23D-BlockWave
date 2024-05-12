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

    validateChain(blockchain) {
        let isValid = true;

        for (let i = 1; i < blockchain.length; i++) {
            const block = blockchain[i];
            const prevBlock = blockchain[i - 1];

            const hash = this.hashBlock(block.timestamp, prevBlock.currentBlockHash, block.data);

            if (hash !== block.currentBlockHash) isValid = false;
            if (block.prevBlockHash !== prevBlock.currentBlockHash) isValid = false;
        }

        return isValid;
    }

}
