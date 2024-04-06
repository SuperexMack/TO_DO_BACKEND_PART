"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const db_2 = require("../db");
const authMiddleware_1 = __importDefault(require("../authMiddleware"));
const router = (0, express_1.Router)();
const MYSCRETCODE = "MACK06062003";
const app = (0, express_1.default)();
app.use(express_1.default.json());
const checker = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = checker.safeParse(req.body);
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log("first");
    if (!success) {
        console.log("second");
        return res.status(400).json({
            msg: "Your entries are unable to pass our test"
        });
    }
    let oldUser = yield db_2.NewUser.findOne({
        username: req.body.username
    });
    if (oldUser) {
        res.json({
            msg: "User with this username is already regestired"
        });
    }
    const user = yield db_2.NewUser.create({
        username: req.body.username,
        password: req.body.password,
    });
    const userid = user._id;
    const token = jsonwebtoken_1.default.sign({
        userid
    }, MYSCRETCODE);
    res.json({
        msg: "User Registered successfully",
        token: token
    });
}));
const todoChecker = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string()
});
router.post("/addData", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.userid;
    if (!userid) {
        return res.status(400).json({
            msg: "Userid is required."
        });
    }
    const { success } = todoChecker.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "The data you are trying to give is not valid || You had not entered a valid data"
        });
    }
    try {
        yield db_1.NewTodo.create({
            userid: userid,
            title: req.body.title,
            description: req.body.description
        });
        res.json({
            msg: "Your data had been added to the database"
        });
    }
    catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({
            msg: "An error occurred while adding todo."
        });
    }
}));
const signuser = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signuser.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            msg: "Your data is either incorrect || you had entered the wrong data"
        });
    }
    const user = yield db_2.NewUser.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userid: user._id
        }, MYSCRETCODE);
        res.json({
            msg: "welcome back",
            token: token
        });
    }
    res.status(400).json({
        msg: "user do not exist"
    });
}));
exports.default = router;
