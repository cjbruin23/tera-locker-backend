"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, 
// @ts-ignore
req, res, 
// @ts-ignore
next) => {
    console.log("Middleware Error Hadnling", err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(500).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};
exports.default = ErrorHandler;
