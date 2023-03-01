"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, req, res) => {
    console.log("Middleware Error Hadnling", err, req);
    //   const errStatus = err || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(500).json({
        success: false,
        status: "errStatus",
        message: errMsg,
    });
};
exports.default = ErrorHandler;
