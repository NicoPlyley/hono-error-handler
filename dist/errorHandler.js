"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultResponseHandler = (error, c) => {
    return c.json({
        success: false,
        message: error.message
    }, error.statusCode);
};
const errorHandler = (errorHandlers, customHandler = defaultResponseHandler) => {
    return (err, c) => {
        let error = err;
        if (Array.isArray(errorHandlers) && errorHandlers.length > 0) {
            if (!error.message || !error.statusCode && error) {
                for (const handleError of errorHandlers) {
                    error = handleError(error);
                    if (error.statusCode) {
                        break;
                    }
                }
            }
        }
        return customHandler(error, c);
    };
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map