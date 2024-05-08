export default class ResponseModel {
    constructor({ statusCode = 404, data = null, error = null }) {
        this.success = false;
        this.statusCode = statusCode;
        this.error = error;

        if (statusCode >= 200 && statusCode <= 299) {
            this.success = true;
        }

        if (data) {
            if (Array.isArray(data)) {
                this.items = data.length;
            } else {
                this.items = 1;
            }
        } else {
            this.items = 0;
        }

        this.data = data;
    }
}