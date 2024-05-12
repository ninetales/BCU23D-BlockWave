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

    hashBlock(timestamp, prevBlockHash, currentBlockData, nonce, difficulty) {
        const stringToHash = timestamp.toString() + prevBlockHash + JSON.stringify(currentBlockData) + nonce + difficulty;
        const hash = createHash(stringToHash);
        return hash;
    }

    proofOfWork(lastBlock, prevBlockHash, data) {
        let difficulty, hash, timestamp;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = this.difficultyAdjustment(lastBlock);
            hash = this.hashBlock(
                timestamp,
                prevBlockHash,
                data,
                nonce,
                difficulty
            );

        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return { nonce, difficulty, timestamp };
    }

    difficultyAdjustment(lastBlock) {
        const MINE_RATE = process.env.MINE_RATE;
        let { difficulty, timestamp } = lastBlock;
        return timestamp + MINE_RATE > timestamp ? +difficulty + 1 : +difficulty - 1;
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
