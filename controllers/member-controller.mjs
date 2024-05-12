import { blockchain } from "../startup.mjs";
import ErrorRespModel from "../utilities/ErrorResponseModel.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";

export const listMembers = (req, res, next) => {
    res.status(200).json(new ResponseModel({ statusCode: 200, data: blockchain.memberNodes }));
}

export const registerMember = (req, res, next) => {
    const reqNode = req.body.nodeUrl;
    const currentNode = blockchain.nodeUrl;
    const membersList = blockchain.memberNodes;

    if (membersList.indexOf(reqNode) === -1 && currentNode !== reqNode) {
        blockchain.memberNodes.push(reqNode);

        syncMembers(reqNode);

        res.status(201).json(new ResponseModel({ statusCode: 201, data: membersList }));
    } else {
        return next(new ErrorRespModel(`Node ${reqNode} is already registred`, 400));
    }
}

export const syncMembers = (url) => {

    const membersList = [...blockchain.memberNodes, blockchain.nodeUrl];

    try {
        membersList.forEach(async (member) => {
            const body = { "nodeUrl": member };
            await fetch(`${url}/api/v1/members/register`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    } catch (error) {
        throw new Error(error);
    }

}