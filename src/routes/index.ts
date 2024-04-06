import express from "express"
const router = express.Router()
// const  userRoute  = require("./user")
import userRoute from "./user"

router.use("/user",userRoute)


export default router