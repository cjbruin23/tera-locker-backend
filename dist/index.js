"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = __importDefault(require("./middleware/ErrorHandler"));
dotenv_1.default.config();
const port = process.env["PORT"];
const app = (0, express_1.default)();
// Right now, protecting all routes
app.use((0, express_oauth2_jwt_bearer_1.auth)({
    issuerBaseURL: `${process.env["AUTH0_DOMAIN"]}`,
    audience: `${process.env["AUTH0_AUDIENCE"]}`,
}));
app.get("/", (req, res) => {
    console.log("req", req);
    res.send("Express + TypeScript Server");
});
app.get("/files", (req, res) => {
    try {
        console.log("get files", req);
        res.send("You do have access to this resource");
    }
    catch (err) {
        console.log("err", err);
    }
});
app.use((err, req, res) => {
    (0, ErrorHandler_1.default)(err, req, res);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
