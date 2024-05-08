import { blockchain } from "../startup.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";

export const getBlockchain = (req, res, next) => {
    try {
        const chainData = blockchain.getChain();
        res.status(200).json(new ResponseModel({ success: true, statusCode: 200, data: chainData }));
    } catch (error) {
        throw new Error(error);
    }
}

export const createBlock = (req, res, next) => {
    try {



        res.status(201).json(new ResponseModel({ success: true, data: block }));
    } catch (error) {
        throw new Error(error);
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