import fs from 'fs';
import path from 'path';
import { blockchain } from "../startup.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";
import { readFromFile, writeToFile } from "../utilities/fileHandler.mjs";

const folder = 'data';
const file = `blockchain-${process.argv[2]}.json`;
const filePath = path.join(__appdir, folder, file);

// ==================================================================
// Create GENESIS BLOCK and a new BLOCKCHAIN FILE upon initiation
// ==================================================================
if (!fs.existsSync(filePath)) {
    const genesisBlock = blockchain.createBlock([], Date.now(), '0', '0', []);
    await writeToFile(folder, file, JSON.stringify([genesisBlock]));
}

export const getBlockchain = async (req, res, next) => {
    const chainData = await readFromFile(folder, file);
    if (chainData !== null) {
        res.status(200).json(new ResponseModel({ success: true, statusCode: 200, data: chainData }));
    } else {
        res.status(404).json(new ResponseModel({ data: { message: "No data available" } }));
    }
}

export const getLastBlock = async () => {
    const chainData = await readFromFile(folder, file);
    return chainData.at(-1);
}

export const createBlock = async (req, res, next) => {
    const lastBlock = await getLastBlock();
    const data = req.body;
    const timestamp = Date.now();
    const chain = await readFromFile(folder, file);

    const currentBlockHash = blockchain.hashBlock(
        timestamp,
        lastBlock.currentBlockHash,
        data
    );

    const block = blockchain.createBlock(
        chain,
        timestamp,
        lastBlock.currentBlockHash,
        currentBlockHash,
        data
    )

    await writeToFile(folder, file, block);

    res.status(201).json({ success: true, data: block });

}

export const getBlockByIndex = async (req, res, next) => {
    const chainData = await readFromFile(folder, file);
    const block = chainData.find((block) => block.blockIndex === Number(req.params.index));
    if (block) {
        res.status(200).json(new ResponseModel({ success: true, statusCode: 200, data: block }));
    } else {
        res.status(404).json(new ResponseModel({ data: { message: 'No block found!' } }));
    }
}

export const synchronizeChain = (reg, res, next) => {
    try {
        res.status(200).json(new ResponseModel({
            success: true,
            statusCode: 200,
            data: { message: 'Synchronization completed!' }
        }));
    } catch (error) {
        throw new Error(error);
    }
}