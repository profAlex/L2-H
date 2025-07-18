"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
module.exports = app;
