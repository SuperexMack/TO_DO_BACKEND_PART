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
exports.NewUser = exports.NewTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const db_link = "mongodb://localhost:27017/XXX";
main()
    .then(() => {
    console.log("your database is connected to the mongoose");
})
    .catch((err) => {
    console.log(err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(db_link);
    });
}
const Mydata = new schema({
    title: String,
    description: String,
    time: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: schema.Types.ObjectId,
        ref: 'MyUser',
        required: true
    }
});
const MyUser = new schema({
    username: String,
    password: String,
});
exports.NewTodo = mongoose_1.default.model("NewTodo", Mydata);
exports.NewUser = mongoose_1.default.model("NewUser", MyUser);
