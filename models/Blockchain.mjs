import { createHash } from '../utilities/cryptoHandler.mjs';
import Block from './Block.mjs';
import { EventEmitter } from 'events';

export default class Blockchain extends EventEmitter {

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

    hashBlock(timestamp, prevBlockHash, currentBlockData) {
        const stringToHash = timestamp.toString() + prevBlockHash + JSON.stringify(currentBlockData);
        const hash = createHash(stringToHash);
        return hash;
    }

}
