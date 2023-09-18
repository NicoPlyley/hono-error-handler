"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (errorHandlers, printStack = true) => (err, c) => __awaiter(void 0, void 0, void 0, function* () {
    let error = err;
    if (printStack && error.stack) {
        console.error(error.stack);
    }
    if (Array.isArray(errorHandlers) && errorHandlers.length > 0) {
        if (!error.message || !error.statusCode && err) {
            for (const handleError of errorHandlers) {
                error = handleError(error);
                if (error.statusCode) {
                    break;
                }
            }
        }
    }
    return c.json({
        success: false,
        message: error.message || 'Internal server error',
    }, (error === null || error === void 0 ? void 0 : error.statusCode) || 500);
});
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map