import express from 'express';
import { getBlockchain, createBlock, getBlockByIndex, synchronizeChain } from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/:index').get(getBlockByIndex);
router.route('/mine').post(createBlock);
router.route('/concensus').get(synchronizeChain);

export default router;