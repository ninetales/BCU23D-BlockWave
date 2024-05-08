import { describe, it, expect, beforeEach } from "vitest";
import Block from './Block.mjs';

describe('Block', () => {
    const timestamp = Date.now();
    const hash = 'current-hash';
    const lastHash = 'previous-hash';
    const data = 'Råglimpa'
    const nonce = 1;
    const difficulty = 1;

    const block = new Block();

    describe('Properties', () => {

        it('should have a timestamp property', () => {
            expect(block).toHaveProperty('timestamp');
        });

    });

});