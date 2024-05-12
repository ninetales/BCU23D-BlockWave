export default class ErrorRespModel extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = `${statusCode}`.startsWith('4') ? false : true;
    }
}