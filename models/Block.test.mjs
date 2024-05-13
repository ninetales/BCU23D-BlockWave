import { Vitest } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";
import Block from './Block.mjs';

describe('Block', () => {
    const timestamp = Date.now();
    const blockIndex = 1;
    const lastHash = 'previous-hash';
    const hash = 'current-hash';
    const data = 'Råglimpa'
    const nonce = 1;
    const difficulty = 1;

    const block = new Block(timestamp, blockIndex, lastHash, hash, data, nonce, difficulty);

    describe('Properties', () => {

        it('Should have a timestamp property', () => {
            expect(block).toHaveProperty('timestamp');
        });

        it('Should have a blockindex property', () => {
            expect(block).toHaveProperty('blockIndex');
        });

        it('Should have a hash property', () => {
            expect(block).toHaveProperty('currentBlockHash');
        });

        it('Should have a lastHash property', () => {
            expect(block).toHaveProperty('previousBlockHash');
        });

        it('Should have a data property', () => {
            expect(block).toHaveProperty('data');
        });

        it('Should have a nonce property', () => {
            expect(block).toHaveProperty('nonce');
        });

        it('Should have a difficulty property', () => {
            expect(block).toHaveProperty('difficulty');
        });

    });

    describe('Property values', () => {

        it('Should have a timestamp', () => {
            expect(block.timestamp).not.equal(undefined);
        });

        it('Should have a blockindex', () => {
            expect(block.blockIndex).toEqual(blockIndex);
        });

        it('Should have a previous block hash', () => {
            expect(block.previousBlockHash).toEqual(lastHash);
        });

        it('Should have a block hash', () => {
            expect(block.currentBlockHash).toEqual(hash);
        });

        it('Should have data', () => {
            expect(block.data).toEqual(data);
        });

        it('Should have nonce', () => {
            expect(block.nonce).toEqual(nonce);
        });

        it('Should have difficulty', () => {
            expect(block.difficulty).toEqual(difficulty);
        });

    });

    it('Should return an instance of the class Block', () => {
        expect(block instanceof Block).toBe(true);
    });

});