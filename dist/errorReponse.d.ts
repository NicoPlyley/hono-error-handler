declare class ErrorResponse extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
export default ErrorResponse;
