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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../authMiddleware"));
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get("/getmydata", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = yield db_1.NewTodo.findOne({
            userid: req.userid
        });
        if (!userdata) {
            return res.status(400).json({
                msg: "The data is not available"
            });
        }
        res.json({
            title: userdata.title,
            description: userdata.description
        });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
