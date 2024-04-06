"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 1000;
const NewTodo = require("./db");
const index_1 = __importDefault(require("./routes/index"));
const showData_1 = __importDefault(require("./routes/showData"));
app.use(express_1.default.json());
app.use("/api/v1", index_1.default);
app.use("/api/v2", showData_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
