import express from 'express';
import { getBlockchain, createBlock, getBlockByIndex, synchronizeChain } from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').post(createBlock);
router.route('/concensus').get(synchronizeChain);
router.route('/:index').get(getBlockByIndex);

export default router;